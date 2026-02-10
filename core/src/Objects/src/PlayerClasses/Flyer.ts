import Fireball from '../../../Abilities/Flyer/Fireball'
import FlameWall from '../../../Abilities/Flyer/FlameWall'
import ForkedLightning from '../../../Abilities/Flyer/ForkedLightning'
import Frostnova from '../../../Abilities/Flyer/Frostnova'
import FrostSphere from '../../../Abilities/Flyer/FrostSphere'
import LightBeacon from '../../../Abilities/Flyer/LightBeacon'
import LightningBolt from '../../../Abilities/Flyer/LightningBolt'
import Sparks from '../../../Abilities/Flyer/Sparks'
import StaticField from '../../../Abilities/Flyer/StaticField'
import Teleportation from '../../../Abilities/Flyer/Teleportation'
import Upgrades from '../../../Classes/Upgrades'
import Func from '../../../Func'
import Level from '../../../Level'
import FlyerArmourMutator from '../../../Mutators/FlyerArmourMutator'
import FlyerCastState from '../../../State/FlyerCastState'
import FlyerDefendState from '../../../State/FlyerDefendState'
import PlayerDyingState from '../../../State/PlayerDyingState'
import CurseOfDamned from '../../../Status/CurseOfDamned'
import Accumulation from '../../../Triggers/Accumulation'
import FlyerCounterTrigger from '../../../Triggers/FlyerCounterTrigger'
import FlyerParryTrigger from '../../../Triggers/FlyerParryTrigger'
import FragilityWhenHitTrigger from '../../../Triggers/FragilityWhenHitTrigger'
import Upgrade from '../../../Types/Upgrade'
import Armour from '../../Effects/Armour'
import Counter from '../../Effects/Counter'
import ToothExplode from '../../Effects/ToothExplode'
import Character from '../Character'
import Unit from '../Unit'

export default class Flyer extends Character {
    static MIN_CAST_SPEED: number = 150

    next_mana_regen_time: any
    takeoff: boolean
    allow_mana_regen_while_def: boolean
    charged_shield: boolean
    mental_shield: boolean

    constructor(level: Level) {
        super(level)
        this.steps = false
        this.cast_speed = 1500
        this.name = 'flyer'
        this.move_speed = 0.45
        this.chance_to_avoid_damage_state = 0
        this.armour_rate = 0
        this.resource = 0
        this.base_regeneration_time = 8000
        this.takeoff = false
        this.allow_mana_regen_while_def = false
        this.charged_shield = false
        this.mental_shield = false
        this.chance_to_block = 100
        this.enlightenment_threshold = 12
        this.armour_mutators = [new FlyerArmourMutator()]
        this.energy_effect_z = 15
        this.parry_window = 450
        this.triggers_on_parry = [new FlyerParryTrigger()]
        this.on_counter_triggers = [new FlyerCounterTrigger()]

        this.action_cd = 18000
        this.action_name = 'dash'
    }


    useAction(){
        this.setActionWindow()
        this.prepareToAction()
        if(!this.attack_angle) return

        if(this.level.enemies.some(elem => Func.distance(this, elem, 8) <= 8 && !elem.is_dead && elem.action_end_time - this.level.time <= 350 && elem.action_end_time - this.level.time > 0)){
            let targets = this.level.enemies.filter(elem => !elem.is_dead && Func.distance(this, elem, 8) <= 8)

            targets.forEach(elem => {         
                let t = this.level.enemies.filter(elem2 => !elem2.is_dead && elem2 != elem)[0]
                if(t){
                    elem.removeTarget(5000)
                    elem.target = t
                }     
            })

            this.level.createEffect(this, 'escape')
        }
        

        let ticks = 12
        let next_step_x = Math.sin(this.attack_angle) * 1
        let next_step_y = Math.cos(this.attack_angle) * 1

        for(let i = 0; i < ticks; i++){
            if (!this.isOutOfMap(this.x + next_step_x, this.y + next_step_y)) {
                this.level.createEffect(this, 'ftrail')
                this.addToPoint(next_step_x, next_step_y)
            }
        }
        
        this.attack_angle = undefined
        this.is_attacking = false
    }

    getAdditionalRadius() {
        return this.getSecondResource()
    }

    getCastState(){
        return new FlyerCastState()
    }

    getDefendState() {
        return new FlyerDefendState()
    }

    generateUpgrades(ascend_level: number) {
        if (!this.can_generate_upgrades) return
        if (this.upgrades.length) return

        super.generateUpgrades()
        //get all upgrades for this class
        let p = Upgrades.getAllUpgrades()
        let all: Upgrade[] = Upgrades.getFlyerUpgrades().concat(p)

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

    castSound() {
        this.level.sounds.push({
            name: 'cast',
            x: this.x,
            y: this.y,
        })
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

        if (main_name === 'frost sphere') {
            this.first_ability = new FrostSphere(this)
        } else if (main_name === 'fireball') {
            this.first_ability = new Fireball(this)
        } else if (main_name === 'lightning bolt') {
            this.first_ability = new LightningBolt(this)
        }

        let secondary_name = abilities.find(elem => elem.type === 2 && elem.selected).name

        if (secondary_name === 'forked lightning') {
            this.second_ability = new ForkedLightning(this)
        } else if (secondary_name === 'flamewall') {
            this.second_ability = new FlameWall(this)
        }

        let finisher_name = abilities.find(elem => elem.type === 3 && elem.selected).name

        if (finisher_name === 'light beacon') {
            this.third_ability = new LightBeacon(this)
        } else if (finisher_name === 'frost nova') {
            this.third_ability = new Frostnova(this)
        } else if (finisher_name === 'sparks') {
            this.third_ability = new Sparks(this)
        }

        let utility_name = abilities.find(elem => elem.type === 4 && elem.selected).name

        if (utility_name === 'teleportation') {
            this.utility = new Teleportation(this)
        } else if (utility_name === 'static field') {
            this.utility = new StaticField(this)
        }

        let passive = abilities.find(elem => elem.type === 5 && elem.selected)

        if (passive) {
            if (passive.name === 'disintegration') {
                this.triggers_on_hit.push(new FragilityWhenHitTrigger(10))
            }
            if (passive.name === 'accumulation') {
                this.triggers_on_use_not_utility.push(new Accumulation())
            }
        }
    }

    getCdRedaction() {
        return this.cooldown_redaction
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

    defendAct() {
        if (!this.pressed[32]) {
            this.getState()
            this.can_regen_resource = true
        }
    }

    isBlock(): boolean {
        if(this.isParry()){
            return true
        }

        return (
            this.state === 'defend' &&
            this.resource > 0 &&
            Func.chance(this.chance_to_block, this.is_lucky)
        )
    }

    isArmourHit(unit: Unit) {
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

    public succesefulBlock(unit: Unit | undefined): void {
        super.succesefulBlock(unit)

        let is_parry = this.isParry()

        if(is_parry){
            this.wasParry(unit)

            this.level.createEffect(this, 'parry', 13)
            
            this.level.sounds.push({
                name: 'parry',
                x: this.x,
                y: this.y,
            })
        }
        
        if(is_parry && Func.chance(20)){
            return
        }

        this.loseEnergy(1)
    }

    setCounterWindow(): void {

        this.counter_start = this.level.time
         
        if(this.can_counter && this.counter_start <= this.counter_time_until){    
            this.can_counter = false
            this.counter_panalty_time = this.counter_start + 3000
        }
        else if(this.counter_start >= this.counter_panalty_time){
            this.counter_time_until = this.counter_start + this.counter_window
            this.can_counter = true

            // let e = new FlyerParry(this.level)
            // e.setPoint(this.x, this.y)

            // this.level.addEffect(e)
        }   
    }

    takeDamage(unit: any = undefined, options: any) {
        if (!this.can_be_damaged) return

        if (options?.instant_death) {
            unit?.succesefulKill()
            this.is_dead = true
            this.life_status = 0
            this.setState(new PlayerDyingState())
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
            e.setPoint(this.x, this.y - 13)
            this.level.addEffect(e)

            this.wasCounter(unit)
            return
        }

        this.playerWasHited(unit)

        if (this.isSpiritBlock()) {
            this.wasSpiritBlock()
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

        if(Func.notChance(this.not_to_lose_courage_when_hit_chacnce)){
            this.reduceSecondResourse(10)
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


    getManaRegenTimer() {
        return this.base_mana_regen_rate - this.getSecondResource() * 25
    }

    startGame() {
        let time = Date.now()
        this.equipItems()
        this.next_life_regen_time = time + this.getRegenTimer()
        this.next_mana_regen_time = time + this.getManaRegenTimer()
        this.check_recent_hits_timer = time + 1000


        let status = new CurseOfDamned(this.level.time)
        status.setDuration(4000)
        this.level.setStatus(this, status)
    }

  
    addResourse(count: number = 1, ignore_limit = false) {
        if (!this.can_regen_resource) return

        if (this.resource < this.maximum_resources || ignore_limit) {
            this.resource += count
            this.playerGetResourse()
        }
    }

    energyRegen(){
        if(this.level.time >= this.next_mana_regen_time){
            this.next_mana_regen_time = this.level.time + this.getManaRegenTimer()
            this.addResourse(1)
        }
    }

    succefullCast() {
        for(let i = 0; i < this.level.enemies.length; i++){
            if(Func.checkAngle(this, this.level.enemies[i], this.attack_angle, 1) && Func.distance(this, this.level.enemies[i]) <= 20){
                this.addCourage()

                return
            }
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

        this.level.players.forEach(elem => {
            elem.addResourse(5, true)
        })

        this.playerWasEnlighted()
        this.level.addSound('enlight', this.x, this.y)
    }

    getCastSpeed() {
        let base = this.cast_speed

        this.attack_speed_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        if (base < Flyer.MIN_CAST_SPEED) {
            base = Flyer.MIN_CAST_SPEED
        }

        return base
    }
}
