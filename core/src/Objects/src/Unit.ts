import Func from '../../Func'
import IUnitState from '../../Interfaces/IUnitState'
import Level from '../../Level'
import FreezeState from '../../State/FreezeState'
import StunnedState from '../../State/StunnedState'
import ZapState from '../../State/ZapState'
import Character from './Character'
import GameObject from './GameObject'

export default abstract class Unit extends GameObject {
    move_speed_penalty: number = 0
    protected collision_slide_strength: number = 0.4
    action_impact: number = 0
    action_end_time: number = 0
    action_is_end: boolean = false
    has_boby: boolean = true
    destroyed: boolean = false
    exploded: boolean = false
    can_be_exploded: boolean = true
    burned: boolean = false
    can_be_instant_killed: boolean = true
    crushing: number = 0
    weapon_angle: number = 0
    is_corpse: boolean = false
    flipped: boolean = false
    is_attacking: boolean = false
    is_moving: boolean = false
    attack_angle: number | undefined = undefined
    attack_radius: number = 0
    state: string = 'none'
    move_angle: number | undefined = undefined
    stateAct: Function | undefined = undefined
    cancelAct: Function | undefined = undefined
    getStateTimer: any
    is_dead: boolean = false
    hit: boolean = false
    action: boolean = false
    attack_speed: number = 2000
    damaged: boolean = false
    action_time: number | undefined
    freezed: boolean = false
    ignited: boolean = false
    can_be_removed: boolean = true
    elemental_status_resist: number = 0

    life_status: number = 1
    armour_rate: number = 0
    stunned: boolean = false
    shocked: boolean = false
    zaped: boolean = false
    critical: number = 0

    fragility: boolean = false
    ward: number = 0
    cast_speed: number = 2000
    can_be_damaged: boolean = true
    pierce: number = 0
    immune_to_freeze = false
    immune_to_zap = false
    immune_to_stun = false
    fortify: number = 0
    power: number = 0

    current_state: IUnitState<Unit> | undefined

    static getHitOptions(){
        return {
            'hit_effects': [],
            explode: false,
            burn: false,
        }
    }

    constructor(level: Level) {
        super(level)
    }

    abstract getState(): void
    abstract toJSON(): object
    abstract takeDamage(unit: Unit | undefined, options: object | undefined): void

    isStatusResist() {
        return false
    }

    setImpactTime(c: number) {
        if (!this.action_time) return

        c += Func.chance(50) ? 5 : -5
        this.action_impact = this.level.time + this.action_time * (c / 100)
        this.action_end_time = this.level.time + this.action_time
    }

    checkArmour(unit: any) {
        if (this.armour_rate === 0) return false

        let p = 0

        if (unit && unit.pierce) {
            p = unit.pierce
        }

        if (p >= this.armour_rate) return false

        let arm = this.armour_rate - p

        if (arm > 95) {
            arm = 95
        }

        let check = Func.chance(arm)

        return check
    }

    drainSoul(){
        
    }

    getMoveSpeed(): number {
        let total_inc = this.move_speed_penalty

        if (!total_inc) return this.move_speed

        if (total_inc > 200) total_inc = 200
        if (total_inc < -95) total_inc = -95

        return this.move_speed * (1 + total_inc / 100)
    }

    addMoveSpeedPenalty(value: number) {
        this.move_speed_penalty += value
    }

    setState(newState: IUnitState<Unit>): void {
        if (this.current_state) {
            this.current_state.exit(this)
        }
        if (newState) {
            this.current_state = newState
            this.current_state.enter(this)
            this.wasChanged()
        }
    }

    protected canMoveTo(nextX: number, nextY: number): boolean {
        if (this.isOutOfMap(nextX, nextY)) {
            return false
        }

        if (this.isPhasing()) {
            return true
        }

        let dx = nextX - this.x
        let dy = nextY - this.y
        let nextBox = this.getBoxElipse(dx, dy)

        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i]

            if (enemy.id === this.id) continue
            if (enemy.isPhasing()) continue
            if (enemy.is_dead) continue

            if (Func.elipseCollision(nextBox, enemy.getBoxElipse())) {
                return false
            }
        }

        return true
    }

    protected moveWithCollision(
        stepX: number,
        stepY: number,
        minSlide = this.collision_slide_strength
    ): boolean {
        let targetX = this.x + stepX
        let targetY = this.y + stepY

        if (this.canMoveTo(targetX, targetY)) {
            this.addToPoint(stepX, stepY)
            this.wasChanged()
            return true
        }

        let xOnlyX = this.x + stepX
        let xOnlyY = this.y
        if (this.canMoveTo(xOnlyX, xOnlyY)) {
            this.addToPoint(stepX, 0)
            this.wasChanged()
            return true
        }

        let yOnlyX = this.x
        let yOnlyY = this.y + stepY
        if (this.canMoveTo(yOnlyX, yOnlyY)) {
            this.addToPoint(0, stepY)
            this.wasChanged()
            return true
        }

        let len = Math.hypot(stepX, stepY)
        if (len <= 0) {
            return false
        }

        let slide = Math.max(minSlide, len * 0.75)
        let sideX = (-stepY / len) * slide
        let sideY = (stepX / len) * slide

        let candidates = [
            { x: this.x + sideX, y: this.y + sideY, dx: sideX, dy: sideY },
            { x: this.x - sideX, y: this.y - sideY, dx: -sideX, dy: -sideY },
        ]

        let best: { dx: number; dy: number } | undefined
        let bestDist = Number.POSITIVE_INFINITY

        for (let i = 0; i < candidates.length; i++) {
            let c = candidates[i]
            if (!this.canMoveTo(c.x, c.y)) continue

            let dX = targetX - c.x
            let dY = targetY - c.y
            let dist = dX * dX + dY * dY

            if (dist < bestDist) {
                bestDist = dist
                best = { dx: c.dx, dy: c.dy }
            }
        }

        if (!best) {
            return false
        }

        this.addToPoint(best.dx, best.dy)
        this.wasChanged()
        return true
    }

    moveByAngle(angle: number) {
        let a = angle

        let l = 1 - Math.abs(0.5 * Math.cos(a))

        let n_x = Math.sin(a) * l
        let n_y = Math.cos(a) * l

        let speed = this.getMoveSpeed()

        n_x *= speed
        n_y *= speed

        if (n_x < 0) {
            this.flipped = true
        } else {
            this.flipped = false
        }

        this.moveWithCollision(n_x, n_y)
    }

    setZap(duration: number = 0) {
        if (this.is_dead) return
        if (!this.can_be_damaged) return
        if (this.immune_to_zap) return
        if (!duration) return
        if (Func.chance(this.elemental_status_resist)) return

        this.setState(new ZapState(duration))
    }

    setStun(duration: number): void {
        if (this.is_dead) return
        if (!this.can_be_damaged) return
        if (this.immune_to_stun) return

        this.setState(new StunnedState(duration))
    }

    setFreeze(duration: number) {
        if (this.is_dead) return
        if (!this.can_be_damaged) return
        if (this.immune_to_freeze) return
        if (Func.chance(this.elemental_status_resist)) return

        if (this instanceof Character) {
            if (this.isStatusResist()) {
                this.statusWasResisted(undefined)
                return
            }
        }

        this.setState(new FreezeState(duration))
    }
}
