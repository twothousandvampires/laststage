import GhostForm from '../../../Abilities/Cultist/GhostForm'
import GrimPile from '../../../Abilities/Cultist/GrimPile'
import PileOfThornCast from '../../../Abilities/Cultist/PileOfThornCast'
import Rune from '../../../Abilities/Cultist/Rune'
import SelfFlagellation from '../../../Abilities/Cultist/SelfFlagellation'
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
import PlayerDyingState from '../../../State/PlayerDyingState'
import Immortality from '../../../Status/Immortality'
import UnbreakableArmour from '../../../Triggers/UnbreakableArmour'
import UnbreakableSpirit from '../../../Triggers/UnbreakableSpirit'
import Armour from '../../Effects/Armour'
import Blood from '../../Effects/Blood'
import Spirit from '../../Effects/Spirit'
import ToothExplode from '../../Effects/ToothExplode'
import Character from '../Character'
import Unit from '../Unit'

export default class Cultist extends Character {
    static MIN_ATTACK_SPEED = 200
    static MIN_CAST_SPEED = 150
    static MAX_ARMOUR = 95

    resource: number
    next_life_regen_time: any
    attack_point_radius: number
    hit_x: number | undefined
    hit_y: number | undefined
    weapon_angle: number
    recent_hits: any
    check_recent_hits_timer: any

    constructor(level: Level) {
        super(level)

        this.weapon_angle = 1.6
        this.attack_point_radius = 4.3
        this.attack_radius = 7
        this.attack_speed = 1550
        this.cast_speed = 1600
        this.name = 'cultist'
        this.move_speed = 0.43
        this.chance_to_avoid_damage_state = 15
        this.armour_rate = 25
        this.resource = 0
        this.hit_x = undefined
        this.hit_y = undefined
        this.enlightenment_threshold = 8

        this.base_regeneration_time = 8000

        this.recent_hits = []
        this.chance_to_block = 65
        this.avaid_damage_mutator = [new CultistWillDamageAvoid()]
        this.armour_mutators = [new CultistArmourMutator()]

        this.courage_expire_timer = 15000
        this.block_for_energy = 5
    }

     sSecondTrigger() {
        return this.chance_to_trigger_additional_time
    }

    getImpactRating() {
        let base = this.impact

        this.impact_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getSkipDamageStateChance() {
        return this.chance_to_avoid_damage_state
    }

    getMoveSpeed(): number {
        let total_inc = this.move_speed_penalty

        if (total_inc === 0) return this.move_speed

        if (total_inc > 200) total_inc = 200
        if (total_inc < -95) total_inc = -95

        return this.move_speed * (1 + total_inc / 100)
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

        if (utility_name === 'self flagellation') {
            this.utility = new SelfFlagellation(this)
        } else if (utility_name === 'ghost form') {
            this.utility = new GhostForm(this)
        }

        let passive = abilities.find(elem => elem.type === 5 && elem.selected)
        
        if (passive) {
            if (passive.name === 'unbreakable spirit') {
                this.triggers_on_get_hit.push(new UnbreakableSpirit())
            }
            if (passive.name === 'unbreakable armour') {
                this.triggers_on_near_dead.push(new UnbreakableArmour())
            }
        }
    }

    addCourage(count = 1) {
        if (!this.can_get_courage) return

        for (let i = 0; i < count; i++) {
            this.recent_hits.push(this.level.time)
        }

        if(Func.chance(this.getChanceForAdditionalCourage())){
            this.recent_hits.push(this.level.time)
        }

        if (this.can_be_enlighten && this.recent_hits.length >= this.enlightenment_threshold) {
            this.can_be_enlighten = false

            this.enlight()

            setTimeout(() => {
                this.can_be_enlighten = true
            }, this.getEnlightenTimer())
        }
    }

    addResourse(count: number = 1, ignore_limit = false) {
        if (!this.can_regen_resource) return

        this.playerGetResourse()

        if (this.resource < this.maximum_resources || ignore_limit) {
            this.resource += count
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

        if(Func.chance(this.getNotToLoseEnergeWhenBlockValue())){
            return
        }
        
        this.resource --
        if(this.resource < 0){
            this.resource = 0
        }
    }

    isBlock(): boolean {
        let b_chance = this.chance_to_block

        b_chance += this.block_for_energy * this.resource

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
            // let count = 1
            // if (unit && Func.chance(unit.critical)) {
            //     count++
            // }
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
        }

        this.playerWasHited(unit)

        if (this.isSpiritBlock()) {
            this.level.addSound('spirit', this.x, this.y)
            let e = new Spirit(this.level)
            e.setPoint(this.x, this.y)
            this.level.addEffect(e)

            this.reduceSecondResourse(1)
            return
        }

        let is_armour_hit = this.isArmourHit(unit)

        if (this.isBlock()) {
            this.level.sounds.push({
                name: 'metal hit',
                x: this.x,
                y: this.y,
            })

            this.succesefulBlock(unit)

            if (is_armour_hit) {
                this.succesefulArmourBlock(unit)
            }

            return
        }

        this.addResourse()
        this.addCourage()

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

        if (Func.chance(30)) {
            this.level.addSound('get hit', this.x, this.y)
        }

        let e = new Blood(this.level)
        e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
        e.z = Func.random(2, 8)
        this.level.effects.push(e)

        if (Func.chance(this.getAvoidChance(), this.is_lucky)) {
            return
        }

        this.subLife(unit, options)
    }

    getSecondResource() {
        return this.recent_hits.length
    }

    reduceSecondResourse(amount: number = 1){
        this.recent_hits.splice(-amount)
    }

    getRegenTimer() {
        return this.base_regeneration_time
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
        this.next_life_regen_time = time + this.getRegenTimer()
        this.check_recent_hits_timer = time + 1000
    }

    getSecondResourceTimer() {
        return this.courage_expire_timer
    }

    regen() {
        let second_resouce_timer = this.getSecondResourceTimer()

        if (this.level.time >= this.check_recent_hits_timer) {
            this.check_recent_hits_timer += 1000

            for (let i = this.recent_hits.length; i >= 0; i--) {
                let hit_time = this.recent_hits[i]

                if (this.level.time - hit_time >= second_resouce_timer) {
                    this.recent_hits.splice(i, 1)
                }
            }

            this.sayPhrase()
        }

        if (this.level.time >= this.next_life_regen_time) {
            this.next_life_regen_time += this.getRegenTimer()

            this.addLife()
        }
    }

    succesefulKill(enemy: Unit) {
        super.succesefulKill(enemy)
    }
    
    getAttackSpeed() {
        let value = this.attack_speed

        if (value < Cultist.MIN_ATTACK_SPEED) {
            value = Cultist.MIN_ATTACK_SPEED
        }

        return value
    }

    getMoveSpeedPenaltyValue() {
        let base = 70

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
