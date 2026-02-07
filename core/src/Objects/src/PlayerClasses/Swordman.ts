import Charge from '../../../Abilities/Swordman/Charge'
import Commands from '../../../Abilities/Swordman/Commands'
import CursedWeapon from '../../../Abilities/Swordman/CursedWeapon'
import Jump from '../../../Abilities/Swordman/Jump'
import Quake from '../../../Abilities/Swordman/Quake'
import WeaponSwing from '../../../Abilities/Swordman/WeaponSwing'
import WeaponThrow from '../../../Abilities/Swordman/WeaponThrow'
import Whirlwind from '../../../Abilities/Swordman/Whirlwind'
import Func from '../../../Func'
import Level from '../../../Level'
import Armour from '../../Effects/Armour'
import Blood from '../../Effects/Blood'
import ToothExplode from '../../Effects/ToothExplode'
import Character from '../Character'
import SpectralSwords from '../../../Abilities/Swordman/SpectralSwords'
import Dash from '../../../Abilities/Swordman/Dash'
import MetalThorns from '../../../Abilities/Swordman/MetalThorns'
import Unit from '../Unit'
import Upgrades from '../../../Classes/Upgrades'
import InnerPowerTrigger from '../../../Triggers/InnerPowerTrigger'
import HeavenIntervention from '../../../Triggers/HeavenIntervention'
import HeavenWrath from '../../../Abilities/Swordman/HeavenWrath'
import Upgrade from '../../../Types/Upgrade'
import Spirit from '../../Effects/Spirit'
import SwordmanArmourMutator from '../../../Mutators/SwordmanArmourMutator'
import Enemy from '../Enemy/Enemy'
import Parry from '../../Effects/Parry'
import SwordmanEnlightment from '../../../Triggers/SwordmanEnlightment'
import Counter from '../../Effects/Counter'
import SwordmanCounterTrigger from '../../../Triggers/SwordmanCounterTrigger'

export default class Swordman extends Character {
    static MIN_ATTACK_SPEED = 150
    static MAX_ARMOUR = 90

    weapon_angle: number
    resource: number
    energy_by_hit_added: boolean = false

    constructor(level: Level) {
        super(level)

        this.enlightenment_threshold = 12
        this.weapon_angle = 1
        this.attack_radius = 8
        this.name = 'swordman'
        this.move_speed = 0.5
        this.chance_to_avoid_damage_state = 10
        this.armour_rate = 0
        this.resource = 0

        this.attack_speed = 1450

        this.base_regeneration_time = 8500
        this.cast_speed = 1650
        this.chance_to_block = 50
        this.armour_mutators = [new SwordmanArmourMutator()]
        this.armour_rate = 15
        this.triggers_on_enlight = [new SwordmanEnlightment()]
        this.on_counter_triggers = [new SwordmanCounterTrigger()]
    }

    succefullCast() {
        this.energy_by_hit_added = false
    }

    getTargetsCount() {
        return 10
    }

    getMoveSpeedReduceWhenBlock() {
        return 80
    }

    succesefulKill(enemy: Enemy) {
        super.succesefulKill(enemy)

        if(enemy.count_as_killed && Func.distance(this, enemy) <= 12){
            this.addCourage()
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

        this.level.addSound('enlight', this.x, this.y)
        this.playerWasEnlighted()
    }

    createAbilities(abilities: any) {
        let main_name = abilities.find(elem => elem.type === 1 && elem.selected).name

        if (main_name === 'swing') {
            this.first_ability = new WeaponSwing(this)
        } else if (main_name === 'weapon throw') {
            this.first_ability = new WeaponThrow(this)
        } else if (main_name === 'dash') {
            this.first_ability = new Dash(this)
        }

        let secondary_name = abilities.find(elem => elem.type === 2 && elem.selected).name

        if (secondary_name === 'jump') {
            this.second_ability = new Jump(this)
        } else if (secondary_name === 'charge') {
            this.second_ability = new Charge(this)
        } else if (secondary_name === 'metal thorns') {
            this.second_ability = new MetalThorns(this)
        }

        let finisher_name = abilities.find(elem => elem.type === 3 && elem.selected).name

        if (finisher_name === 'whirlwind') {
            this.third_ability = new Whirlwind(this)
        } else if (finisher_name === 'quake') {
            this.third_ability = new Quake(this)
        } else if (finisher_name === 'spectral swords') {
            this.third_ability = new SpectralSwords(this)
        } else if (finisher_name === 'heaven wrath') {
            this.third_ability = new HeavenWrath(this)
        }

        let utility_name = abilities.find(elem => elem.type === 4 && elem.selected).name

        if (utility_name === 'cursed weapon') {
            this.utility = new CursedWeapon(this)
        } else if (utility_name === 'commands') {
            this.utility = new Commands(this)
        }

        let passive_name = abilities.find(elem => elem.type === 5 && elem.selected).name

        if (passive_name === 'inner power') {
            this.triggers_on_near_dead.push(new InnerPowerTrigger())
        }

        if (passive_name === 'heaven intervention') {
            this.triggers_on_get_hit.push(new HeavenIntervention())
        }
    }

    public succesefulBlock(unit: Unit | undefined): void {
        super.succesefulBlock(unit)

        if(this.isParry()){
            this.wasParry(unit)

            let e = new Parry(this.level)
            e.setPoint(this.x, this.y - 10)

            this.level.addEffect(e)
            this.level.sounds.push({
                name: 'parry',
                x: this.x,
                y: this.y,
            })
            return
        }
        
        this.level.sounds.push({
            name: 'metal hit',
            x: this.x,
            y: this.y,
        })
        if(Func.chance(this.getNotToLoseEnergeWhenBlockValue())){
            return
        }

        this.loseEnergy(1)
    }

    isBlock(crush: number = 0): boolean {
        if(this.state != 'defend') return false

        if(this.isParry()){
            return true
        }

        let b_chance = this.chance_to_block

        b_chance += this.resource * this.block_for_energy

        if (b_chance > 95) {
            b_chance = 95
        }

        return Func.chance(b_chance, this.is_lucky)
    }

    isArmourHit(unit: Unit): boolean {
        let p = 0

        if (unit) {
            p = unit.pierce
        }

        let total = this.getTotalArmour()

        if (p >= total) return false

        let arm = total - p

        if (arm > 95) {
            arm = 95
        }

        return Func.chance(arm, this.is_lucky)
    }

    takeDamage(unit: any = undefined, options: any = {}) {
        if (!this.can_be_damaged) return
       
        if (options?.instant_death) {
            unit?.succesefulKill()
            this.is_dead = true
            this.life_status = 0
            this.level.playerDead()
            return
        }

        if (this.damaged || this.is_dead) return

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

        if(this.isCounter()){
            let e = new Counter(this.level)
            e.setPoint(this.x, this.y - 10)
            this.level.addEffect(e)

            this.wasCounter(unit)
            return
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

        let e = new Blood(this.level)
        e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
        e.z = Func.random(2, 8)
        this.level.effects.push(e)

        if (Func.chance(this.getAvoidChance(), this.is_lucky)) {
            return
        }

        if(Func.notChance(this.not_to_lose_courage_when_damage_chance)){
            this.reduceSecondResourse(7)
        }
        
        this.subLife(unit, options)
    }

    getPenaltyByLifeStatus() {
        if (this.life_status === 2) {
            return 10
        } else if (this.life_status === 1) {
            return 20
        } else {
            return 0
        }
    }

    getSkipDamageStateChance() {
        return this.chance_to_avoid_damage_state
    }

    generateUpgrades() {
        if (!this.can_generate_upgrades) return
        if (this.upgrades.length) return

        super.generateUpgrades()
        
        let p = Upgrades.getAllUpgrades()
        let all: Upgrade[] = Upgrades.getSwordmanUpgrades().concat(p)

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

    getAttackSpeed() {
        let base = this.attack_speed

        this.attack_speed_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        if (base < Swordman.MIN_ATTACK_SPEED) {
            base = Swordman.MIN_ATTACK_SPEED
        }
        console.log(base)
        return base
    }

    addResourse(count: number = 1, ignore_limit = false) {
        if (!this.can_regen_resource) return
    
        if (this.resource >= this.maximum_resources && !ignore_limit) {
            return
        }

        this.resource += count
        this.playerGetResourse()
    }

    addPoint(count: number = 1, ignore_limit = false) {
        if (this.energy_by_hit_added) return
        if (!this.can_regen_resource) return

    
        if (this.resource >= this.maximum_resources) {
            return
        }
         
        this.resource += count

        if (this.resource > this.maximum_resources) {
            this.resource = this.maximum_resources
        }

        this.playerGetResourse()
        this.energy_by_hit_added = true
    }
}
