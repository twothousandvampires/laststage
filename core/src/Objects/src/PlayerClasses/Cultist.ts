import GhostForm from '../../../Abilities/Cultist/GhostForm'
import GrimPile from '../../../Abilities/Cultist/GrimPile'
import PileOfThornCast from '../../../Abilities/Cultist/PileOfThornCast'
import Rune from '../../../Abilities/Cultist/Rune'
import ShatterShell from '../../../Abilities/Cultist/ShatterShell'
import ShieldBash from '../../../Abilities/Cultist/ShieldBash'
import Slam from '../../../Abilities/Cultist/Slam'
import Soulrender from '../../../Abilities/Cultist/Soulrender'
import UnleashPain from '../../../Abilities/Cultist/UnleashPain'
import WanderingEvil from '../../../Abilities/Cultist/WanderingEvil'
import Upgrades from '../../../Classes/Upgrades'
import Func from '../../../Func'
import Level from '../../../Level'
import CultistArmourMutator from '../../../Mutators/CultistArmourMutator'
import CultistWillDamageAvoid from '../../../Mutators/CultistWillDamageAvoid'
import CultistDefendState from '../../../State/CultistDefendState'
import CultistGhostState from '../../../State/CultistGhostState'
import PlayerDyingState from '../../../State/PlayerDyingState'
import DeathAura from '../../../Status/DeathAura'
import Immortality from '../../../Status/Immortality'
import SoulAttractor from '../../../Status/SoulAttractor'
import SoulHarvester from '../../../Status/SoulHarvester'
import CultistKillTrigger from '../../../Triggers/CultistKillTrigger'
import CultistLoseLife from '../../../Triggers/CultistLoseLife'
import Armour from '../../Effects/Armour'
import Blood from '../../Effects/Blood'
import BloodyVinesEffect from '../../Effects/BloodyVinesEffect'
import Counter from '../../Effects/Counter'
import SoulDevouring from '../../Effects/SoulDevouring'
import ToothExplode from '../../Effects/ToothExplode'
import Character from '../Character'
import Unit from '../Unit'

export default class Cultist extends Character {
    static MIN_ATTACK_SPEED = 200
    static MIN_CAST_SPEED = 150
    static MAX_ARMOUR = 95

    resource: number
    attack_point_radius: number
    hit_x: number | undefined
    hit_y: number | undefined
    weapon_angle: number
    ghost_time_until: number = 0
    soul_on_kill_chance: number = 15
   
    constructor(level: Level) {
        super(level)

        this.weapon_angle = 1.6
        this.attack_point_radius = 4.3
        this.attack_radius = 7
        this.attack_speed = 1500
        this.cast_speed = 1600
        this.name = 'cultist'
        this.move_speed = 0.43
        this.chance_to_avoid_damage_state = 15
        this.resource = 0
        this.hit_x = undefined
        this.hit_y = undefined
        this.enlightenment_threshold = 12

        this.base_regeneration_time = 6000

        this.chance_to_block = 65
        this.avaid_damage_mutator = [new CultistWillDamageAvoid()]
        this.armour_mutators = [new CultistArmourMutator()]
        this.triggers_on_lose_life = [new CultistLoseLife()]
        this.triggers_on_kill = [new CultistKillTrigger()]

        this.courage_expire_timer = 8000
        this.armour_rate = 35
        this.parry_window = 300
        this.action_cd = 6000
        this.action_name = 'self-flagellation'
    }

    useAction(): void {
        this.setActionWindow()

        let e = new Blood(this.level)
        e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
        e.z = Func.random(2, 8)
        this.level.effects.push(e)

        this.chance_to_avoid_damage_state += 100
        this.subLife(this, {})
        this.chance_to_avoid_damage_state -= 100
    }

    getDefendState() {
        if(this.ghost_time_until && this.ghost_time_until - this.level.time < 2000){
            return new CultistGhostState()
        }
        else{
            return new CultistDefendState()
        }   
    }

    getSkipDamageStateChance() {
        return this.chance_to_avoid_damage_state
    }

    createAbilities(abilities: any) {
        let main_name = abilities.find(elem => elem.type === 1 && elem.selected).name

        if (main_name === 'slam') {
            this.first_ability = new Slam(this)
        } else if (main_name === 'rune') {
            this.first_ability = new Rune(this)
        } else if (main_name === 'soulrender') {
            this.first_ability = new Soulrender(this)
        }

        let secondary_name = abilities.find(elem => elem.type === 2 && elem.selected).name

        if (secondary_name === 'shield bash') {
            this.second_ability = new ShieldBash(this)
        } else if (secondary_name === 'grim pile') {
            this.second_ability = new GrimPile(this)
        }

        let finisher_name = abilities.find(elem => elem.type === 3 && elem.selected).name

        if (finisher_name === 'unleashing pain') {
            this.third_ability = new UnleashPain(this)
        } else if (finisher_name === 'pile of thorns') {
            this.third_ability = new PileOfThornCast(this)
        } else if (finisher_name === 'wandering evil') {
            this.third_ability = new WanderingEvil(this)
        }

        let utility_name = abilities.find(elem => elem.type === 4 && elem.selected).name

        if (utility_name === 'shatter-shell') {
            this.utility = new ShatterShell(this)
        } else if (utility_name === 'ghost form') {
            this.utility = new GhostForm(this)
        }

        let passive = abilities.find(elem => elem.type === 5 && elem.selected)
        
        if (passive) {
            if (passive.name === 'death aura') {
                let s = new DeathAura(0)
                this.level.setStatus(this, s)
            }
            if (passive.name === 'soul attractor') {
                let s = new SoulAttractor(0)
                this.level.setStatus(this, s)
            }
        }
    }

    addResourse(count: number = 1, ignore_limit = false) {
        if (!this.can_regen_resource) return

        if (this.resource < this.maximum_resources || ignore_limit) {
            this.resource += count
            this.playerGetResourse()
        }
    }

    enlight() {
        let count = 10

        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones

            let angle = min_a
            let proj = new ToothExplode(this.level)
            proj.setPoint(this.x + 7 * Math.sin(angle), this.y + 7 * Math.cos(angle))

            this.level.effects.push(proj)
        }

        this.can_be_damaged = false
        this.armour_rate += 1

        let s = new Immortality(this.level.time)
        s.setDuration(3000)

        this.playerWasEnlighted()
        this.level.setStatus(this, s)

        this.level.addSound('enlight', this.x, this.y)
    }

    getPenaltyByLifeStatus(): number {
        if (this.life_status === 2) {
            return 5
        } else if (this.life_status === 1) {
            return 10
        } else {
            return 0
        }
    }

    public succesefulBlock(unit: Unit | undefined): void {
        super.succesefulBlock(unit)

        this.level.sounds.push({
            name: 'metal hit',
            x: this.x,
            y: this.y,
        })
    }

    isBlock(): boolean {
        let b_chance = this.chance_to_block

        if (b_chance > 95) {
            b_chance = 95
        }

        return this.state === 'defend' && Func.chance(b_chance, this.is_lucky)
    }

    isArmourHit(unit: Unit): boolean {
        let p = 0

        if (unit) {
            p = unit.pierce
        }

        let total = this.getTotalArmour()

        if (p >= total) return false

        let arm = total - p

        if (arm > Cultist.MAX_ARMOUR) {
            arm = Cultist.MAX_ARMOUR
        }

        return Func.chance(arm, this.is_lucky)
    }

    takeDamage(unit: any = undefined, options: any = {}) {
        if (!this.can_be_damaged) return

        if (this.damaged || this.is_dead) return

        if (options?.instant_death) {
            unit?.succesefulKill()
            this.is_dead = true
            this.life_status = 0
            this.setState(new PlayerDyingState())
            return
        }

        if (this.ward) {
            this.loseWard(1)
            let e = new ToothExplode(this.level)
            e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
            e.z = Func.random(2, 8)
            this.level.effects.push(e)

            this.level.addSound({
                name: 'ward hit',
                x: this.x,
                y: this.y,
            })

            return
        }

        if(this.isEscape()){
            let e = new BloodyVinesEffect(this.level)
            e.setOwner(this)
            e.setPoint(this.x, this.y)
    
            this.level.binded_effects.push(e)
            this.wasEscape(unit)
            return
        }

        if(this.isCounter() && unit != this){

            let e = new Counter(this.level)
            e.setPoint(this.x, this.y - 10)
            this.level.addEffect(e)

            if(unit && !unit.is_dead){
                this.addLife(1)
                this.succesefulKill(unit)
                // let s = new SoulHarvester(this.level.time)
                // s.setDuration(5000)
                // this.level.setStatus(this, s, true)

                this.level.removeEnemy(unit)
                
                let e = new SoulDevouring(unit.level)
                e.setPoint(unit.x, unit.y)
                this.level.effects.push(e)
            }

            this.wasCounter(unit)
            return
        }

        this.playerWasHited(unit)

        if (this.isSpiritBlock()) {
            this.wasSpiritBlock()
            return
        }

        let is_armour_hit = this.isArmourHit(unit)

        if(this.isParry() && unit != this){
            this.level.createEffect(this, 'parry', 10)

            if(unit){
                if(!unit.is_dead){
                    unit.drainSoul()
                }
            
                let s = new SoulHarvester(this.level.time)
                s.setDuration(5000)
                this.level.setStatus(this, s, true)
            }

            this.wasParry(unit)
        }

        if (this.isBlock()) {
            this.succesefulBlock(unit)

            if (is_armour_hit) {
                this.succesefulArmourBlock(unit)
            }

            return
        }

        if (is_armour_hit) {
            this.level.sounds.push({
                name: 'metal hit',
                x: this.x,
                y: this.y,
            })
            let e = new Armour(this.level)
            e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
            e.z = Func.random(2, 8)
            this.level.effects.push(e)

            this.succesefulArmourBlock(unit)
            return
        }
        
        if (Func.chance(this.getAvoidChance(), this.is_lucky)) {
            this.level.createEffect(this, 'damage avoid')
            return
        }

        this.subLife(unit, options)
    }

    generateUpgrades() {
        if (!this.can_generate_upgrades) return
        if (this.upgrades.length) return

        super.generateUpgrades()
        //get all upgrades for this class
        let p = Upgrades.getAllUpgrades()
        let all = Upgrades.getCultistUpgrades().concat(p)

        //filter by usability
        let filtered = all.filter(elem => {
            return (
                (!elem.ascend || this.ascend_level >= elem.ascend) &&
                elem.cost <= this.grace &&
                elem.canUse(this) &&
                (elem.type != 'new ability' || (!this.suggested_abilities.includes(elem.name)))
            )
        })
        filtered.forEach(elem => {
            if (elem.ascend === undefined) {
                elem.ascend = 0
            }
        })

        filtered.sort((a, b) => {
            return b.cost + b.ascend - (a.cost + a.ascend)
        })

        let part_size = Math.ceil(filtered.length / 3)

        let part1 = filtered.slice(0, part_size)
        let part2 = filtered.slice(part_size, part_size * 2)
        let part3 = filtered.slice(part_size * 2)

        if(this.upgrades_generated % 5 === 0){
            let upgrade = Func.getRandomFromArray(part1)
            this.upgrades = this.upgrades.concat(upgrade)
            part1 = part1.filter(elem => upgrade.name != elem.name)

            upgrade = Func.getRandomFromArray(part1)
            this.upgrades = this.upgrades.concat(upgrade)
            part1 = part1.filter(elem => upgrade.name != elem.name)

            upgrade = Func.getRandomFromArray(part1)
            this.upgrades = this.upgrades.concat(upgrade)
            part1 = part1.filter(elem => upgrade.name != elem.name)

            if(this.upgrades.length < 3){
                this.upgrades = this.upgrades.concat(Func.getRandomFromArray(part2))
                if(this.upgrades.length < 3){
                    this.upgrades = this.upgrades.concat(Func.getRandomFromArray(part3))
                }
            }
        }
        else{
            this.upgrades = this.upgrades.concat(Func.getRandomFromArray(part1))
            this.upgrades = this.upgrades.concat(Func.getRandomFromArray(part2))
            this.upgrades = this.upgrades.concat(Func.getRandomFromArray(part3))
        }

        this.upgrades = this.upgrades.filter(elem => elem)

        this.upgrades.forEach(elem => {
            if(elem.type == 'new ability'){
                this.suggested_abilities.push(elem.name)
            }
        })   
    }

    startGame() {
        let time = Date.now()
        this.equipItems()
        this.setRegenTimer()
        this.check_recent_hits_timer = time + 1000
    }

    getSecondResourceTimer() {
        return this.courage_expire_timer
    }

    succesefulKill(enemy: Unit) {
        super.succesefulKill(enemy)
    }
    
    getAttackSpeed() {
        let base = this.attack_speed

        this.attack_speed_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        if (base < Cultist.MIN_ATTACK_SPEED) {
            base = Cultist.MIN_ATTACK_SPEED
        }

        return base
    }

    getMoveSpeedPenaltyValue() {
        let base = this.base_move_speed_penalty_when_action

        this.reduces_move_speed_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        if(base < 0){
            base = 0
        }

        return base
    }

    getCastSpeed() {
        let value = this.cast_speed

        if (value < Cultist.MIN_CAST_SPEED) {
            value = Cultist.MIN_CAST_SPEED
        }

        return value
    }
}
