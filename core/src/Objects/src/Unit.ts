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

    moveByAngle(angle: number) {
    const a = angle;
    // Изометрический коэффициент коррекции Y
    const l = 1 - Math.abs(0.5 * Math.cos(a));
    
    const speed = this.getMoveSpeed();
    let n_x = Math.sin(a) * l * speed;
    let n_y = Math.cos(a) * l * speed;

    // Поворот спрайта
    this.flipped = n_x < 0;

    // Проверка границ карты (мгновенный выход, если за краем)
    if (this.isOutOfMap(this.x + n_x, this.y + n_y)) return;

    if (!this.isPhasing()) {
        let x_coll = false;
        let y_coll = false;
        let coll_e_x = null;
        let coll_e_y = null;


        const nearby = this.level.getNearby(this.x, this.y); // функция, которая берет 9 ячеек
        
        for (let i = 0; i < nearby.length; i++) {
            const enemy = nearby[i];

            if (enemy.is_dead || enemy === this || enemy.isPhasing()) continue;

            // Проверка коллизии по X (для слайдинга вдоль препятствий)
            if (!x_coll && Func.elipseCollision(this.getBoxElipse(n_x, 0), enemy.getBoxElipse())) {
                x_coll = true;
                coll_e_x = enemy;
                n_x = 0; // Останавливаем движение по X
            }

            // Проверка коллизии по Y
            if (!y_coll && Func.elipseCollision(this.getBoxElipse(0, n_y), enemy.getBoxElipse())) {
                y_coll = true;
                coll_e_y = enemy;
                n_y = 0; // Останавливаем движение по Y
            }

            // Если застряли по обеим осям, дальше цикл крутить нет смысла
            if (x_coll && y_coll) break;
        }

        // ФИЗИЧЕСКИЙ АНТИ-СТАК (Если зажаты со всех сторон)
        if (x_coll && y_coll) {
            // 1. Находим среднюю точку между двумя препятствиями
            // Если есть оба — толкаемся от середины, если один — от него.
            let targetX = coll_e_x ? coll_e_x.x : (coll_e_y ? coll_e_y.x : this.x);
            let targetY = coll_e_y ? coll_e_y.y : (coll_e_x ? coll_e_x.y : this.y);
            
            if (coll_e_x && coll_e_y) {
                targetX = (coll_e_x.x + coll_e_y.x) / 2;
                targetY = (coll_e_x.y + coll_e_y.y) / 2;
            }

            let dx = this.x - targetX;
            let dy = this.y - targetY;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist === 0) {
                n_x = Math.random() > 0.5 ? 0.5 : -0.5;
                n_y = Math.random() > 0.5 ? 0.5 : -0.5;
            } else {
                // Выталкиваем по результирующему вектору
                n_x = (dx / dist) * 0.5;
                n_y = (dy / dist) * 0.5;
            }
        }
    }

    // Финальное перемещение
    this.addToPoint(n_x, n_y);
    this.wasChanged();
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
