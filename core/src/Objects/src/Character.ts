import Ability from '../../Abilities/Ability'
import UpgradeManager from '../../Classes/UpgradeManager'
import Func from '../../Func'
import Mastery from '../../Glyphs/Mastery'
import IUnitState from '../../Interfaces/IUnitState'
import Item from '../../Items/Item'
import item from '../../Items/Item'
import Jewel from '../../Jeewl/Jewel'
import Level from '../../Level'
import CouragedAttackSpeedMutator from '../../Mutators/CouragedAttackSpeedMutator'
import CouragedCastSpeedMutator from '../../Mutators/CouragedCastSpeedMutator'
import CouragedMoveSpeedMutator from '../../Mutators/CouragedMoveSpeedMutator'
import Mutator from '../../Mutators/Mutator'
import PlayerDamagedState from '../../State/PlayerDamagedState'
import PlayerDeadState from '../../State/PlayerDeadState'
import SwordmanDefendState from '../../State/SwordmanDefendState'
import PlayerDyingState from '../../State/PlayerDyingState'
import PlayerIdleState from '../../State/PlayerIdleState'
import Status from '../../Status/Status'
import ImpactTrigger from '../../Triggers/ImpactTrigger'
import LifeAfterKIllTrigger from '../../Triggers/LifeAfterKIllTrigger'
import Sound from '../../Types/Sound'
import Upgrade from '../../Types/Upgrade'
import Blood from '../Effects/Blood'
import Courage from '../Effects/Courage'
import Effect from '../Effects/Effects'
import Energy from '../Effects/Energy'
import Grace from '../Effects/Grace'
import HalfEnergy from '../Effects/HalfEnergy'
import Regen from '../Effects/Regen'
import SmallTextLanguage1 from '../Effects/SmallTextLanguage1'
import TextLanguage1 from '../Effects/TextLanguage1'
import Ward from '../Effects/Ward'
import WeakCourage from '../Effects/WeakCourage'
import Enemy from './Enemy/Enemy'
import Unit from './Unit'
import PlayerCastState from '../../State/PlayerCastState'
import PlayerAttackState from '../../State/PlayerAttackState'

export default abstract class Character extends Unit {
    static MAX_ITEMS_TO_PURCHASE: number = 3

    next_life_regen_time: any // when player will regen next life
    action_end_time: number = 0 // when player end currect action
    pressed: { [key: string]: any } = {}
    angle_for_forced_movement: number | undefined
    c_x: number = 0
    c_y: number = 0
    purchased_items: number = 0
    action_name: string = ''
    first_ability: Ability | undefined
    second_ability: Ability | undefined
    third_ability: Ability | undefined
    utility: Ability | undefined
    passive: any
    item: item[] = []
    masteries: Mastery[] = []
    grand_forgings: Jewel[] = []

    max_items: number = 6
    start_move_time: number = 0
    end_move_time: number = 0
    last_time_the_skill_was_used: number | undefined
    last_hit_time: number = 0
    last_time_get_hit: number = 0
    dead_time: number = 0
    impact_radius:number = 10
    base_mana_regen_rate: number = 5000

    upgrades_generated: number = 0

    enlight_timer: number = 35000
    base_regeneration_time: number = 10000
    grace: number = 1
    voice_radius: number = 20
    gold: number = 0
    cooldown_redaction: number = 0
    max_life: number = 4
    maximum_resources: number = 8
    resource: number = 0
    crushing_rating: number = 0
    impact: number = 0
    cast_speed: number = 2000
    status_resistance: number = 5
    spirit: number = 0

    is_lucky: boolean = false
    steps: boolean = true
    blessed: boolean = false

    triggers_on_kill: any[] = [new LifeAfterKIllTrigger()]
    triggers_on_hit: any[] = [new ImpactTrigger()]
    triggers_on_use_not_utility: any[] = []
    triggers_on_near_dead: any[] = []
    triggers_on_player_dead: any[] = []
    triggers_on_lethal_damage: any[] = []
    triggers_on_get_hit: any[] = []
    triggers_on_heal: any[] = []
    triggers_on_status_resist: any[] = []
    triggers_on_block: any[] = []
    triggers_on_say: any[] = []
    triggers_on_lose_life: any[] = []
    triggers_on_get_energy: any = []
    triggers_on_start_block: any = []
    triggers_on_enemy_die: any = []
    triggers_on_pierce: any = []
    triggers_on_armour_hit: any = []
    triggers_on_critical: any[] = []
    triggers_on_enlight: any[] = []
    triggers_on_impact: any[] = []
    triggers_on_crushing: any[] = []
    triggers_on_trigger: any[] = []
    triggers_on_parry: any[] = []
    on_counter_triggers: any[] = []
    on_escape_triggers: any[] = []
    triggers_on_gold: any[] = []
    on_spirit_block_triggers: any[] = []

    chance_to_instant_kill: number = 0
    chance_to_avoid_damage_state: number = 0
    chance_to_say_phrase: number = 1
    chance_to_get_additional_gold: number = 0
    chance_to_block: number = 0
    chance_to_create_grace: number = 0
    chance_to_trigger_additional_time: number = 0
    chance_not_lose_energy_when_block: number = 10
    additional_courage_chance: number = 0
    avoid_damage_chance: number = 0
    chance_to_additional_carved_spark: number = 0
    block_for_energy: number = 1
    additional_energy_chance: number = 0
    not_to_pay_finisher_chance: number = 0
    chance_to_regen_additional_life: number = 0

    enlightenment_threshold: number = 12
    can_get_courage: boolean = true
    can_be_controlled_by_player: boolean = true
    can_be_lethaled: boolean = true
    can_regen_resource: boolean = true
    can_regen_life: boolean = true
    can_use_skills: boolean = true
    can_generate_upgrades: boolean = true
    can_be_enlighten: boolean = true
    can_regen_more_life_chance: number = 0
    can_attack: boolean = true
    can_cast: boolean = true
    can_block: number = 0
    can_ressurect: boolean = false
    ascend_level: number = 0
    courage_expire_timer: number = 3000
    last_ascent_mastery_getting: number = 0
    vampiric_rate: number = 0

    refresh_courage_chance: number = 0
    not_to_lose_courage_when_damage_chance: number = 0

    kills: number = 0
    blocks: number = 0
    hits: number = 0
    ability_use: number = 0
    gold_earned: number = 0
    life_gained: number = 0
    triggers_count: number = 0

    //parry
    can_parry: boolean = true
    parry_start: number = 0
    parry_window: number = 250
    parry_time_until: number = 0
    parry_panalty_time: number = 0

    //counter
    can_counter: boolean = true
    counter_start: number = 0
    counter_window: number = 250
    counter_time_until: number = 0
    counter_panalty_time: number = 0

    //escape
    can_use_action: boolean = true
    action_start: number = 0
    action_window: number = 250
    action_time_until: number = 0

    suggested_abilities: string[]=  []

    spend_grace: boolean = false
    target: string | undefined
    a: number = 0.2

    upgrades: any[] = []

    pay_to_cost: number = 0
    after_grace_statuses: Status[] = []

    using_ability: any
    items_to_buy: Item[] = []

    couraged_in_portal: boolean = false

    pierce_rating_mutators: Mutator[] = []
    critical_rating_mutators: Mutator[] = []
    avaid_damage_mutator: Mutator[] = []
    armour_mutators: Mutator[] = []
    impact_mutators: Mutator[] = []
    regen_over_max_mutators: Mutator[] = []
    chance_not_to_lose_energy_when_block_mutators: Mutator[] = []
    reduces_move_speed_mutators: Mutator[] = []

    move_speed_penalty_mutators: Mutator[] = [new CouragedMoveSpeedMutator()]
    attack_speed_mutators: Mutator[] = [new CouragedAttackSpeedMutator()]
    cast_speeed_mitator: Mutator[] = [new CouragedCastSpeedMutator()]

    base_move_speed_penalty_when_action: number = 70

    carved_sparks: number = 0
    left_teacher: boolean = false
    left_forger: boolean = false

    stats: (keyof Character)[] = ['pierce', 'armour_rate', 'critical', 'crushing_rating', 'impact', 'power']

    energy_effect: any = undefined
    energy_effect_z = 12
    defended: boolean = false
    courage_effect: any = undefined
    not_to_lose_courage_when_hit_chacnce: number = 0
    not_to_lose_regen_when_damage_chance: number = 0
    current_regen_time: number = 0
    regen_effect: any
    courage_lose_rate: number = 0

    check_recent_hits_timer: any

    courages: any[] = []
    damage_state_duration: number = 300
    action_cd: number = 10000
    light_r_delta: number = 0

    constructor(level: Level) {
        super(level)
        this.box_r = 2.5
        this.light_r = 16
        this.life_status = 4
        this.pierce = 10
        this.getState()
    }

    abstract startGame(): void
    abstract createAbilities(abilities: any): void
    abstract takeDamage(unut: Unit | undefined, options: object): void
    abstract getSkipDamageStateChance(): number
    abstract isBlock(): boolean
    abstract getPenaltyByLifeStatus(): number
    abstract getMoveSpeedPenaltyValue(): number
    abstract enlight(): void

    abstract useAction(): void

    canUseAction(){
        return this.level.time - this.action_start >= this.action_cd
    }

    setActionWindow(){
        this.action_start = this.level.time 
        this.action_time_until = this.level.time + this.action_window
    }

    wasEscape(unit:any){
        this.action_time_until = 0

        let time = this.level.time

        this.on_escape_triggers.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, unit)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    isEscape(){
        return (this.level.time - 100) <= this.action_time_until
    }

    getTotalMoveSpeedPenalty(){
        let base = this.move_speed_penalty

        this.move_speed_penalty_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getRegenTimer() {
        return this.base_regeneration_time + ((this.life_status - 1) * 3500)
    }

    getSecondResourceTimer() {
        return this.courage_expire_timer
    }

    drainSoul(){

    }

    regen() {
        let second_resouce_timer = this.getSecondResourceTimer()
        

        if (this.level.time >= this.check_recent_hits_timer) {
            if(Func.chance(30)){
                this.light_r_delta += Func.chance(50) ? -1 : 1
                if(this.light_r_delta < -1){
                    this.light_r_delta = -1
                }
                if(this.light_r_delta > 1){
                    this.light_r_delta = 1
                }
            }
            this.check_recent_hits_timer += 1000

            let last = this.courages.pop()
            if(last){
                if(last >= this.level.time - second_resouce_timer){
                    this.courages.push(last)
                }
                else if(Func.chance(this.refresh_courage_chance)){
                    this.courages.push(this.level.time)
                }
                else{
                    if(this.courage_lose_rate){
                        this.courages.splice(-this.courage_lose_rate);
                    }

                    this.courage_lose_rate ++
                }         
            }

            this.sayPhrase()
            this.playerGainCourage()
        }

        if (this.level.time >= this.next_life_regen_time) {
            this.addLife()
            this.setRegenTimer()  
        }
        else if (this.level.time >= this.next_life_regen_time - 3000 && !this.regen_effect) {
            this.regen_effect = new Regen(this.level)
            this.regen_effect.setOwner(this)
            this.regen_effect.setPoint(this.x, this.y)

            this.level.binded_effects.push(this.regen_effect)
        }
    }

    getMoveSpeed(): number {
        let total_inc = this.getTotalMoveSpeedPenalty()
     
        if (!total_inc) return this.move_speed

        if (total_inc > 200) total_inc = 200
        if (total_inc < -95) total_inc = -95

        return this.move_speed * (1 + total_inc / 100)
    }

    isParry(){
        return this.can_parry && (this.level.time - 50) <= this.parry_time_until
    }

    isCounter(){
        return this.can_counter && (this.level.time - 100) <= this.counter_time_until
    }

    isCouraged(){
        let courage = this.getSecondResource()

        return courage >= this.enlightenment_threshold
    }

    addCourage(count = 1) {
        if (!this.can_get_courage) return

        this.courage_lose_rate = 0

        let is_couraged = this.isCouraged()

        for (let i = 0; i < count; i++) {
            this.courages.push(this.level.time)
        }

        if(Func.chance(this.getChanceForAdditionalCourage())){
            this.courages.push(this.level.time)
        }

        if (this.can_be_enlighten && this.courages.length >= this.enlightenment_threshold && !is_couraged) {
            this.can_be_enlighten = false
            this.enlight()

            setTimeout(() => {
                this.can_be_enlighten = true
            }, this.getEnlightenTimer())
        }

        this.playerGainCourage()
    }

    playerGainCourage(){
        let courage = this.getSecondResource()

        if(courage >= this.enlightenment_threshold){
            if(this.courage_effect instanceof Courage) return

            if(this.courage_effect){
                this.courage_effect.delete()
            }
            
            this.courage_effect = new Courage(this.level)
            this.courage_effect.setOwner(this)

            this.level.binded_effects.push(this.courage_effect)
        }
        else if(courage >= Math.floor(this.enlightenment_threshold / 2)){
            if(this.courage_effect instanceof WeakCourage) return

            if(this.courage_effect){
                this.courage_effect.delete()
            }

            this.courage_effect = new WeakCourage(this.level)
            this.courage_effect.setOwner(this)

            this.level.binded_effects.push(this.courage_effect)
        }
        else{
            if(this.courage_effect){
                this.courage_effect.delete()
            }

            this.courage_effect = undefined
        }
    }

    getTotalArmour(){
        let base = this.armour_rate

        this.armour_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })
        
        return base
    }

    changeStats(value: number){
        this.stats.forEach(stat => {
            let cur_stat = this[stat]
            if(typeof cur_stat === 'number'){
                (this[stat] as number) += value
            }
        })
    }

    getChanceForAdditionalCourage(){
        return this.additional_courage_chance
    }

    getPower(){
        return this.power
    }
    
    getAvoidChance(){
        let base = this.avoid_damage_chance

        this.avaid_damage_mutator.forEach(elem => {
            base = elem.mutate(base, this)
        })
        
        return base
    }

    getNotToLoseEnergeWhenBlockValue(){
        let base = this.chance_not_lose_energy_when_block

        this.chance_not_to_lose_energy_when_block_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getCritical(){
        let base = this.critical
       
        this.critical_rating_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })
        
        return base
    }

    getInstantKillChance(){
        return this.chance_to_instant_kill
    }

    generateUpgrades(){
        this.upgrades_generated ++
    }

    succesefulPierce(enemy: Unit): void {
        let time = this.level.time

        this.triggers_on_pierce.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    impactHit(enemy: any = undefined, impact_damage: number = 1) {
        let time = this.level.time

        this.triggers_on_impact.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy, impact_damage)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy, impact_damage)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    playerApplyCrushing(enemy: Unit){
        let time = this.level.time

        this.triggers_on_crushing.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    isCrushing() {
        if(this.crushing_rating <= 0) return false
        
        return Func.chance(this.crushing_rating, this.is_lucky)  
    }

    playerGetResourse(value: number = 0) {
        let time = this.level.time

        this.triggers_on_get_energy.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, value)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, value)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })

        if(Func.chance(this.additional_energy_chance)){
            this.resource ++
        }

        this.checkEnergyEffect()
    }

    checkEnergyEffect(){
        if(this.resource >= this.third_ability?.cost){
            if(this.energy_effect instanceof Energy) return

            if(this.energy_effect){
                this.energy_effect.delete()
            }
            
            this.energy_effect = new Energy(this.level)
            this.energy_effect.setOwner(this)
            this.energy_effect.z  = this.energy_effect_z

            this.level.binded_effects.push(this.energy_effect)
        }
        else if(this.resource >= this.second_ability?.cost){
            if(this.energy_effect instanceof HalfEnergy) return

            if(this.energy_effect){
                this.energy_effect.delete()
            }

            this.energy_effect = new HalfEnergy(this.level)
            this.energy_effect.setOwner(this)
            this.energy_effect.z  = this.energy_effect_z

            this.level.binded_effects.push(this.energy_effect)
        }
        else{
            if(this.energy_effect){
                this.energy_effect.delete()
            }

            this.energy_effect = undefined
        }
    }

    getCastSpeed() {
        let base = this.cast_speed

        this.cast_speeed_mitator.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getPierce() {
        let base = this.pierce

        this.pierce_rating_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    succesefulArmourBlock(target: Unit) {
        let time = this.level.time

        this.triggers_on_armour_hit.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, target)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, target)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    useAbility(ability: Ability) {
        this.using_ability = ability
        this.pay_to_cost = ability.cost
        this.useNotUtility()

        ability.use(this)
    }

    useNotUtility(): void {
        let time = this.level.time

        this.ability_use ++

        this.triggers_on_use_not_utility.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })

        this.last_time_the_skill_was_used = this.level.time
        this.sayPhrase()
    }

    getImpactRating() {
        let base = this.impact

        this.impact_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getLightRadius(){
        let d = this.max_life - this.life_status
        if(d < 0){
            d = 0
        }
        return this.light_r - d + this.light_r_delta
    }

    toJSON() {
        return {
            abilities: [
                this.action_name,
                this.first_ability?.name,
                this.second_ability?.name,
                this.third_ability?.name,
                this.utility?.name,     
            ],
            can_use: [
                this.canUseAction(),
                this.first_ability?.canUse(),
                this.second_ability?.canUse(),
                this.third_ability?.canUse(),
                this.utility?.canUse(),           
            ],
            resource: this.resource,
            maximum_resources: this.maximum_resources,
            life_status: this.life_status,
            max_life: this.max_life,
            life: this.life_status,
            x: this.x,
            y: this.y,
            id: this.id,
            state: this.state,
            flipped: this.flipped,
            name: this.name,
            z: this.z,
            action_time: this.action_time,
            light_r: this.getLightRadius(),
            ward: this.ward,
            invisible: this.invisible,
            courage: this.getSecondResource(),
            max_courage: this.enlightenment_threshold,
            zone: this.zone_id
        }
    }
    
    wasSpiritBlock(enemy: any){
        this.level.addSound('spirit', this.x, this.y)
        this.level.createEffect(this, 'spirit')

        this.reduceSecondResourse(1)

        let time = this.level.time

        this.on_spirit_block_triggers.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    isSpiritBlock() {
        if (this.getSecondResource() <= 0) return false

        return Func.chance(this.spirit, this.is_lucky)
    }

    succesefulCritical(enemy: Enemy): void {
        let time = this.level.time

        this.triggers_on_critical.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    getIdleState() {
        return new PlayerIdleState()
    }

    protected equipItems() {
        this.item.forEach(elem => {
            elem.setPlayer(this)
            elem.unlockForgings()
            elem.pickRandomForging()
        })
    }

    setParryWindow(){
        this.parry_start = this.level.time
         
        if(this.can_parry && this.parry_start <= this.parry_time_until){    
            this.can_parry = false
            this.parry_panalty_time = this.parry_start + 3000
        }
        else if(this.parry_start >= this.parry_panalty_time){
            this.parry_time_until = this.parry_start + this.parry_window
            this.can_parry = true
        }
    }

    setCounterWindow(){
        this.counter_start = this.level.time
         
        if(this.can_counter && this.counter_start <= this.counter_time_until){    
            this.can_counter = false
            this.counter_panalty_time = this.counter_start + 3000
        }
        else if(this.counter_start >= this.counter_panalty_time){
            this.counter_time_until = this.counter_start + this.counter_window
            this.can_counter = true
        }
    }

    wasCounter(unit: any){
        this.counter_time_until = 0

        let time = this.level.time
      
        this.on_counter_triggers.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    // if (Func.chance(this.isSecondTrigger())) {
                    //     elem.trigger(this, unit)
                    // }

                    elem.last_trigger_time = time
                    // this.wasTrigger()
                }
            }
        })
    }

    wasParry(unit: Unit | undefined){
        let time = this.level.time

        this.parry_time_until = 0

        this.triggers_on_parry.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, unit)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    public succesefulBlock(unit: Unit | undefined): void {
        let time = this.level.time

        this.blocks ++

        this.triggers_on_block.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, unit)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    getResistValue(): number {
        return this.status_resistance
    }

    public isStatusResist(): boolean {
        let chacne = this.getResistValue()

        if (chacne > 95) {
            chacne = 95
        }
        
        let result = Func.chance(chacne, this.is_lucky)
        if(result){
            this.level.addLog('player resist')
        }
        return result
    }

    loseEnergy(v = 11111){
        this.resource -= v
        if(this.resource < 0){
            this.resource = 0
        }
        this.checkEnergyEffect()
    }

    payCost() {
        if(Func.chance(this.not_to_pay_finisher_chance)){
            this.pay_to_cost = 0
        }
        this.resource -= this.pay_to_cost
        this.pay_to_cost = 0
        
        if (this.resource < 0) {
            this.resource = 0
        }

        this.checkEnergyEffect()
    }

    protected getEnlightenTimer(): number {
        return this.enlight_timer
    }

    wasTrigger(){
        this.triggers_count ++

        let time = this.level.time

        this.triggers_on_trigger.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    playerWasEnlighted() {
        let time = this.level.time

        this.triggers_on_enlight.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    public statusWasApplied(): void {
        //todo
    }

    public addGoldValue(value = 1){
        this.gold += value
        this.gold_earned += value
        this.goldWasAdded(value)
    }

    public addResourse(count: number = 1, ignore_limit = false) {
        if (!this.can_regen_resource) return

        let value = count

        if(!ignore_limit){
            let max = this.maximum_resources - this.resource
            if(max < 0){
                max = 0
            }
            value = value > max ? max : value
        }
      
        this.resource += value
        this.playerGetResourse(value)
    }

    public addGold(value: number = 0): void {
        let total = Func.chance(value) ? 1 : 0
   
        if (Func.chance(this.chance_to_get_additional_gold, this.is_lucky)) {
            total ++
        }

        if(total > 0){
            this.gold += total
            this.gold_earned += total
            this.level.addLog('gold')
            this.goldWasAdded(total)
        }
    }

    goldWasAdded(value = 1){
        let time = this.level.time

        this.triggers_on_gold.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, value)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, value)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    onSayTriggers() {
        let time = this.level.time
        this.level.addLog('say phrase')
        this.triggers_on_say.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    public sayPhrase(force: boolean = false): void {
        return
        if (!Func.chance(Math.round(this.chance_to_say_phrase)) && !force) return

        let phrase = undefined

        if(Func.chance(5)){
            phrase = new TextLanguage1(this.level)
        }
        else{
            phrase = new SmallTextLanguage1(this.level) 
        }

        phrase.z = 12
        phrase.setPoint(this.x, this.y)

        this.onSayTriggers()

        this.level.players.forEach(elem => {
            if (elem != this && Func.distance(elem, this) <= this.voice_radius) {
                setTimeout(() => {
                    elem.sayPhrase()
                }, 1500)
            }
        })

        this.level.effects.push(phrase)
    }

    public getMoveSpeedReduceWhenUseSkill(): number {
        return 70
    }

    getAttackState(){
        return new PlayerAttackState()
    }

    getAttackSpeed() {
        let base = this.attack_speed

        this.attack_speed_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    getStats() {
        let descriptions = {
            armour: 'Increases your chance of not taking damage.',
            resist: 'Increases your chance of not geting bad status(ignite, shock, etc).',
            spirit: 'Increases your chance of losing courage instead of life.',
            pierce: 'Increases your chance to deal additional damage by reducing enemy armour.',
            impact: 'Increases your chance to damage adjacent targets in addition to your primary target. Rating above 100 gives a chance to create additional impcats.',
            critical: 'Increases your chance to deal double damage.',
            crushing:
                'Increases your chance to crush an enemy, every time when enemy being crushed they take additional damage next time.',
            power: 'Gives a chance to increase damage by 1 after all calculations, determines the overall strength of the character, affects the receipt of some improvements',
            fortification:
                'Gives a chance to reduce damage by 1 before multiplying of receiving damage',
            'double triggering': 'chance that trigger will triger twice',
            'avoid damage': 'chance to avoid damage',
            'blessed blood': 'chance to regenerate life above maximum',
            'sacred strike': 'chance to kill enemy instantly',
            'vampiric rate': 'chance to get life after killing enemy',
            'move penalty': 'movement speed reduction rate when using an ability',
            'additional life': 'chance to regenerate additional life when gain life'
        }
        return {
            stats: {
                'main': {                
                    pierce: this.getPierce() + '%',
                    impact: this.getImpactRating() + '%',
                    critical: this.getCritical() + '%',
                    crushing: this.crushing_rating + '%',
                    armour: this.getTotalArmour(),       
                    power: this.getPower(),
                },
                'survivability': {
                    'max life': this.max_life,             
                    spirit: this.spirit + '%',
                    fortification: this.fortify + '%',
                    'regeneration': this.getRegenTimer() / 1000 + 'sec',
                    'additional life': this.chance_to_regen_additional_life    
                },             
                'misc': {
                    resist: this.getResistValue() + '%',
                    ward: this.ward,
                    'cd reduction': this.getCdRedaction() + '%',                 
                    'vampiric rate': this.vampiric_rate,
                    'block chance': this.chance_to_block,
                },
                'blessings': {
                    'blessed blood': this.canRegenMoreLife() + '%',
                    'sacred strike': this.getInstantKillChance() + '%',
                    'double trigger': this.isSecondTrigger(),    
                    'avoid damage': this.getAvoidChance(),     
                },
                'speed': {
                    'attack speed': this.getAttackSpeed() + 'ms',
                    'cast speed': this.getCastSpeed() + 'ms',  
                    'move speed': this.move_speed_penalty + '%',
                    'move penalty': this.getMoveSpeedPenaltyValue(),  
                },
                'stats': {
                    kills: this.kills,
                    blocks: this.blocks,
                    hits: this.hits,
                    'ability used': this.ability_use,
                    'gold earned': this.gold_earned,
                    'life gained': this.life_gained,
                    'triggers': this.triggers_count
                }   
            },
            descriptions: descriptions,
        }
    }

    public takePureDamage(value: number = 1): void {
        this.subLife(undefined, {
            damage_value: value,
        })
    }

    public removeUpgrades(): void {
        this.upgrades.length = 0
    }

    public addWard(value: number = 1) {
        if (this.ward <= 0) {
            let e = new Ward(this.level)

            e.setOwner(this)
            e.setPoint(this.x, this.y)

            this.level.binded_effects.push(e)
        }

        this.ward += value
    }

    public loseWard(value: number = 1) {
        this.ward -= value

        if (this.ward <= 0) {
            this.ward = 0
            let e = this.level.binded_effects.find(
                elem => (elem.owner = this && elem instanceof Ward)
            )

            if (e) {
                this.level.binded_effects = this.level.binded_effects.filter(elem => elem != e)
                this.level.deleted.push(e.id)
            }
        }
    }

    getTriggers(triggers: any[]) {
        let result: any[] = []

        triggers.forEach(elem => {
            if (!elem.hidden) {
                result.push({
                    name: elem.name,
                    description: elem.description,
                    cd: elem.frequency ? elem.frequency : elem.cd,
                    chance: elem.chance,
                })
            }
        })

        return result
    }

    getTriggersFromAbility(triggers: any[], chance: number) {
        let result: any[] = []

        triggers.forEach((elem, index) => {
            if (!elem.hidden) {
                result.push({
                    name: elem.name,
                    description: elem.description,
                    cd: elem.cd,
                    chance: Math.round(chance / (1 + index)),
                })
            }
        })

        return result
    }

    startDefend() {
        let time = this.level.time

        this.triggers_on_start_block.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    getTriggersInfo() {
        let result = {}

        result['on kill'] = this.getTriggers(this.triggers_on_kill)
        result['on hit'] = this.getTriggers(this.triggers_on_hit)
        result['use ability'] = this.getTriggers(this.triggers_on_use_not_utility)
        result['near dead'] = this.getTriggers(this.triggers_on_near_dead)
        result['player dead'] = this.getTriggers(this.triggers_on_player_dead)
        result['get lethal damage'] = this.getTriggers(this.triggers_on_lethal_damage)
        result['when get hit'] = this.getTriggers(this.triggers_on_get_hit)
        result['on heal'] = this.getTriggers(this.triggers_on_heal)
        result['status resist'] = this.getTriggers(this.triggers_on_status_resist)
        result['on block'] = this.getTriggers(this.triggers_on_block)
        result['when speak'] = this.getTriggers(this.triggers_on_say)
        result['when lose life'] = this.getTriggers(this.triggers_on_lose_life)
        result['when get energy'] = this.getTriggers(this.triggers_on_get_energy)
        result['when start block'] = this.getTriggers(this.triggers_on_start_block)
        result['when enemy die'] = this.getTriggers(this.triggers_on_enemy_die)
        result['when pierce'] = this.getTriggers(this.triggers_on_pierce)
        result['armour block'] = this.getTriggers(this.triggers_on_armour_hit)
        result['critical strike'] = this.getTriggers(this.triggers_on_critical)
        result['enlightenment'] = this.getTriggers(this.triggers_on_enlight)
        result['impact'] = this.getTriggers(this.triggers_on_impact)
        result['crushing'] = this.getTriggers(this.triggers_on_crushing)

        result[this.first_ability.name] = this.getTriggersFromAbility(
            this.first_ability.after_use_triggers,
            this.first_ability.mastery_chance
        )
        result[this.second_ability.name] = this.getTriggersFromAbility(
            this.second_ability.after_use_triggers,
            this.second_ability.mastery_chance
        )
        result[this.third_ability.name] = this.getTriggersFromAbility(
            this.third_ability.after_use_triggers,
            this.third_ability.mastery_chance
        )
        result[this.utility.name] = this.getTriggersFromAbility(
            this.utility.after_use_triggers,
            this.utility.mastery_chance
        )

        return result
    }

    public upgrade(upgrade_name: string): void {
        let upgrade: Upgrade = this.upgrades.find(elem => elem.name === upgrade_name)

        if (!upgrade) return

        upgrade.teach(this)

        if(this.couraged_in_portal && Func.chance(20)){

        }
        else{
            this.grace -= upgrade.cost
            this.spend_grace = true
        }
        
        if (upgrade.cost) {
            this.addAscent()
        }
        
        this.level.addSound('upgrade', this.x, this.y)

        this.removeUpgrades()
        UpgradeManager.closeUpgrades(this)
    }

    addAscent(value = 1) {
        this.ascend_level += value
    }

    public exitGrace(): void {
        this.can_generate_upgrades = true
        let portal: Effect | undefined = this.level.binded_effects.find(
            elem => elem.name === 'grace'
        )

        if (portal instanceof Grace) {
            portal.playerLeave(this)
        }
    }

    updateClientSkill(): void {
        let data = [
            {
                type: 'first',
                name: this?.first_ability?.name,
            },
            {
                type: 'secondary',
                name: this?.second_ability?.name,
            },
            {
                type: 'finisher',
                name: this?.third_ability?.name,
            },
            {
                type: 'utility',
                name: this?.utility?.name,
            },
        ]
        this.level.socket.send(this.id, 'update_skill', data)
    }

    public setZone(zone_id: number, x: number, y: number): void {
        this.zone_id = zone_id
        this.x = x
        this.y = y
    }

    isRegenAdditionalLife() {
        return this.chance_to_regen_additional_life
    }

    canRegenMoreLife() {
        let base = this.can_regen_more_life_chance

        this.regen_over_max_mutators.forEach(elem => {
            base = elem.mutate(base, this)
        })

        return base
    }

    public addLife(
        count: number = 1,
        ignore_poison: boolean = false,
        ignore_limit: boolean = false
    ): void {
        if (!this.can_regen_life && !ignore_poison) return

        if (this.isRegenAdditionalLife()) {
            count++
        }

        let restored = 0

        for (let i = 0; i < count; i++) {
            let previous = this.life_status
            if (previous > this.max_life) {
                continue
            } else if (previous === this.max_life) {
                if (ignore_limit || this.canRegenMoreLife()) {
                    this.life_status ++
                    restored ++
                }
            } else {
                let penalty = this.getPenaltyByLifeStatus()
                this.addMoveSpeedPenalty(penalty)
                this.life_status ++
                restored ++
            }
        }

        this.life_gained += restored

        if (restored > 0) {
            this.playerWasHealed()
        }
    }

    public playerWasHealed(): void {
        let time = this.level.time

        this.triggers_on_heal.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    protected getWeaponHitedSound(): Sound {
        return {
            name: 'sword hit',
            x: this.x,
            y: this.y,
        }
    }

    public statusWasResisted(status: Status | undefined) {
        this.triggers_on_status_resist.forEach(elem => {
            elem.trigger(this, status)
        })
    }

    public subLife(unit: any = undefined, options: any): void {
        let value = 1

        if (options?.damage_value) {
            value = options.damage_value
        }

        if (value <= 0) {
            return
        }

        if (unit) {
            let a = this.getTotalArmour()
          
            let p = unit.pierce
          
            if(Func.chance(p - a)){
                 this.level.addLog('enemy pierce')

                this.level.addSound('get hit', this.x, this.y)
                let e = new Blood(this.level)
                e.setPoint(Func.random(this.x - 3, this.x + 3), Func.random(this.y - 1, this.y + 1))
                e.z = Func.random(2, 8)
                this.level.effects.push(e)
                value ++
            }   
                           
        }

        if (Func.chance(this.fortify)) {
            this.level.addLog('player fortify')
            value --
        }

        if (unit && Func.chance(unit.critical)) {
            value *= 2
             this.level.addLog('enemy critical')
            this.level.addSound('get hit', this.x, this.y)

            let e = new Blood(this.level)
            e.setPoint(Func.random(this.x - 3, this.x + 3), Func.random(this.y - 3, this.y + 3))
            e.z = Func.random(2, 8)
            this.level.effects.push(e)
        }

        if (this.fragility) {
            value *= 2
        }

        if (unit && Func.chance(unit.power)) {
            this.level.addLog('enemy power')
            value ++
        }
      
        if (value > 0) {
            this.last_time_get_hit = this.level.time

            for (let i = 0; i < value; i++) {
                if (this.life_status <= 0) continue

                this.life_status--

                let penalty = -this.getPenaltyByLifeStatus()
                this.addMoveSpeedPenalty(penalty)

                if (this.life_status === 1) {
                    this.reachNearDead()
                }

                if (this.life_status <= 0) {
                    this.playerTakeLethalDamage()
            
                    if (this.can_be_lethaled) {
                        if (options?.explode) {
                            this.exploded = true
                        }
                        if (unit instanceof Character) {
                            unit.succesefulKill(this)
                        }
                        this.is_dead = true
                        this.setState(new PlayerDyingState())
                    }
                }
            }

           

            if (this.is_dead) return

            if (this.life_status > 0) {
                this.playerLoseLife(unit)
                if(options?.hit_effects){
                    options.hit_effects.forEach(elem => {
                        this.level.setStatus(this, elem)
                    })
                }         
            }

            if (!this.can_be_lethaled) {
                this.addLife(1, true)
                this.can_be_lethaled = true
            }

            if (!this.freezed && Func.notChance(this.getSkipDamageStateChance(), this.is_lucky)) {
                this.setState(new PlayerDamagedState())
            }
        }
    }

    getSecondResource() {
        return this.courages.length
    }

    reduceSecondResourse(amount: number = 1){
        this.courages.splice(-amount)

        this.playerGainCourage()
    }
    
    setRegenTimer(){
        if(this.regen_effect){
            this.regen_effect.delete()
            this.regen_effect = undefined
        }
        if(this.life_status < this.max_life || (this.life_status === this.max_life && this.canRegenMoreLife())){
            let timer = this.getRegenTimer()
            this.current_regen_time = timer
            this.next_life_regen_time = this.level.time + timer
        }      
    }

    playerLoseLife(unit: any) {
        let time = this.level.time

        if(Func.chance(this.not_to_lose_regen_when_damage_chance)){

        }
        else{
            this.setRegenTimer()
        }
   
        this.triggers_on_lose_life.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, unit)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    isSecondTrigger() {
        return this.chance_to_trigger_additional_time
    }

    protected playerWasHited(unit: Unit | undefined): void {
        let time = this.level.time

        this.hits ++

        this.triggers_on_get_hit.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, unit)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, unit)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })

        this.sayPhrase()
    }

    public playerTakeLethalDamage(): void {
        this.triggers_on_lethal_damage.forEach(elem => {
            elem.trigger(this)
        })
    }

    public playerDead(): void {
        this.triggers_on_player_dead.forEach(elem => {
            elem.trigger(this)
        })
    }

    public reachNearDead(): void {
        this.triggers_on_near_dead.forEach(elem => {
            elem.trigger(this)
        })
    }

    public succesefulKill(enemy: Unit): void {
        if (!enemy) return
        let time = this.level.time

        this.kills ++

        this.triggers_on_kill.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, enemy)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, enemy)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })
    }

    public succesefulHit(target = undefined, damage_value = 1): void {
        if (!target) return

        let time = this.level.time

        this.triggers_on_hit.forEach(elem => {
            if (time - elem.last_trigger_time >= elem.cd) {
                if (Func.chance(elem.getTriggerChance(this), this.is_lucky)) {
                    elem.trigger(this, target, damage_value)

                    if (Func.chance(this.isSecondTrigger())) {
                        elem.trigger(this, target, damage_value)
                    }

                    elem.last_trigger_time = time
                    this.wasTrigger()
                }
            }
        })

        this.last_hit_time = this.level.time
    }

    public setTarget(id: string): void {
        if (!this.target) {
            this.target = id
        }
    }

    protected reaA(): void {
        if (this.a <= 0) {
            this.a = 0
            return
        }
        this.a = 0.005
    }

    protected incA(): void {
        if (this.a >= 1) {
            return
        }

        if (this.a <= 0) {
            this.a = 0.005
        } else {
            this.a *= 2
        }

        if (this.a >= 1) {
            this.a = 1
        }
    }

    public getTarget(): Unit | undefined {
        if (!this.target) return undefined

        let t = this.level.enemies.find(elem => elem.id === this.target)

        if (!t) {
            t = this.level.players.find(elem => elem.id === this.target && elem.id != this.id)
        }

        if (t) {
            return t
        }

        return undefined
    }

    protected canMove(): boolean {
        return !this.freezed && !this.zaped
    }

    enemyDeadNearby(enemy: Enemy) {
        this.triggers_on_enemy_die.forEach(elem => {
            elem.trigger(this, enemy)
        })
    }

    private directMove(): void {
        if (this.canMove()) {
            this.incA()
            this.is_moving = true
            if (this.state === 'idle') {
                this.state = 'move'
            }
        } else if (!this.canMove()) {
            this.reaA()
            this.is_moving = false
            if (this.state === 'move') {
                this.state = 'idle'
            }
            return
        }

        let a = this.angle_for_forced_movement

        if (!a) {
            return
        }

        let l: number = 1 - Math.abs(0.5 * Math.cos(a))

        let next_step_x = Math.sin(a) * l
        let next_step_y = Math.cos(a) * l

        let speed = this.getMoveSpeed()

        if (next_step_x < 0 && !this.is_attacking) {
            this.flipped = true
        } else if (!this.is_attacking && next_step_x > 0) {
            this.flipped = false
        }

        next_step_x *= speed
        next_step_y *= speed

        next_step_x *= this.a
        next_step_y *= this.a

        let coll_e_x = undefined
        let coll_e_y = undefined

        let x_coll = false
        let y_coll = false

        if (!this.isPhasing()) {
            for (let i = 0; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i]
                if (enemy.isPhasing()) continue

                if (Func.elipseCollision(this.getBoxElipse(next_step_x, 0), enemy.getBoxElipse())) {
                    x_coll = true
                    next_step_x = 0
                    coll_e_x = enemy
                    if (y_coll) {
                        break
                    }
                }

                if (Func.elipseCollision(this.getBoxElipse(0, next_step_y), enemy.getBoxElipse())) {
                    y_coll = true
                    next_step_y = 0
                    coll_e_y = enemy
                    if (x_coll) {
                        break
                    }
                }
            }
        }

        if (!this.isOutOfMap(this.x + next_step_x, this.y + next_step_y)) {
            if (x_coll && next_step_y === 0) {
                if (this.y <= coll_e_x.y) {
                    next_step_y = -0.2
                } else {
                    next_step_y = 0.2
                }
            }

            if (y_coll && next_step_x === 0) {
                if (this.x <= coll_e_y.x) {
                    next_step_x = -0.2
                } else {
                    next_step_x = 0.2
                }
            }

            this.addToPoint(next_step_x, next_step_y)
        }
    }

    private moveAct(tick: number): void {
        if (this.angle_for_forced_movement) {
            this.directMove()
            return
        }
        if (this.moveIsPressed() && this.canMove()) {
            this.incA()
            if (!this.is_moving) {
                this.is_moving = true
                this.start_move_time = tick
            }
            if (this.state === 'idle') {
                this.state = 'move'
            }
        } else if (!this.moveIsPressed() || !this.canMove()) {
            this.reaA()
            if (this.is_moving) {
                this.is_moving = false
                this.end_move_time = tick
            }
            if (this.state === 'move') {
                this.state = 'idle'
            }
            return
        }

        let next_step_x = 0
        let next_step_y = 0

        if (this.pressed[87]) {
            next_step_y = -1
        }
        if (this.pressed[83]) {
            next_step_y = 1
        }
        if (this.pressed[68]) {
            next_step_x = 1
        }
        if (this.pressed[65]) {
            next_step_x = -1
        }

        if (next_step_x != 0 && next_step_y != 0) {
            next_step_x *= 0.67
            next_step_y *= 0.67
        }

        if (next_step_x < 0 && !this.is_attacking) {
            this.flipped = true
        } else if (!this.is_attacking && next_step_x > 0) {
            this.flipped = false
        }

        next_step_y *= 0.5

        let speed = this.getMoveSpeed()

        next_step_x *= speed
        next_step_y *= speed

        next_step_x *= this.a
        next_step_y *= this.a

        let coll_e_x = undefined
        let coll_e_y = undefined

        let x_coll = false
        let y_coll = false

        if (!this.phasing) {
            for (let i = 0; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i]

                if (enemy.phasing) continue
                if (enemy.is_dead) continue

                if (Func.elipseCollision(this.getBoxElipse(next_step_x, 0), enemy.getBoxElipse())) {
                    x_coll = true
                    next_step_x = 0
                    coll_e_x = enemy
                    if (y_coll) {
                        break
                    }
                }

                if (Func.elipseCollision(this.getBoxElipse(0, next_step_y), enemy.getBoxElipse())) {
                    y_coll = true
                    next_step_y = 0
                    coll_e_y = enemy
                    if (x_coll) {
                        break
                    }
                }
            }
        }

        if (!this.isOutOfMap(this.x + next_step_x, this.y + next_step_y)) {
            if (x_coll && next_step_y === 0) {
                if (this.y <= coll_e_x.y) {
                    next_step_y = -0.2
                } else {
                    next_step_y = 0.2
                }
            }

            if (y_coll && next_step_x === 0) {
                if (this.x <= coll_e_y.x) {
                    next_step_x = -0.2
                } else {
                    next_step_x = 0.2
                }
            }

            this.addToPoint(next_step_x, next_step_y)
        }
    }

    public newStatus(status: any): void {
        this.level.socket.send(this.id, 'new_status', status)
    }

    private moveIsPressed(): boolean {
        return this.pressed[87] || this.pressed[83] || this.pressed[65] || this.pressed[68]
    }

    succefullCast() {}

    prepareToAction() {
        this.is_attacking = true

        let rel_x = Math.round(this.pressed.canvas_x + this.x)
        let rel_y = Math.round(this.pressed.canvas_y + this.y)
        this.c_x = rel_x
        this.c_y = rel_y

        if (!this.c_x || this.c_y) {
            this.c_x = Math.round(this.pressed.over_x + this.x)
            this.c_y = Math.round(this.pressed.over_y + this.y)
        }

        if (this.c_x < this.x) {
            this.flipped = true
        } else {
            this.flipped = false
        }

        if (!this.attack_angle) {
            this.attack_angle = Func.angle(this.x, this.y, this.c_x, this.c_y)
        }
    }

    getCdRedaction() {
        return this.cooldown_redaction
    }

    getMoveSpeedReduceWhenBlock() {
        return 80
    }

    getCastState(){
        return new PlayerCastState()
    }

    getDefendState() {
        return new SwordmanDefendState()
    }

    energyRegen(){
        
    }

    getTime(){
        return this.level.time
    }

    canBlock(){
        return this.can_block <= 0
    }

    public act(time: number): void {
        if (!this.defended && this.canBlock() && this.can_be_controlled_by_player && this.pressed[32]) {
            this.setState(this.getDefendState())
        }

        if (this.current_state) {
            this.current_state.update(this, time)
        }

        if (!this.is_dead) {
            this.moveAct(time)
            this.regen()
            this.energyRegen()
        }

        if (this.action_impact && time >= this.action_impact) {
            if (!this.action) {
                this.action = true
            } else {
                this.action = false
                this.action_impact = 0
            }
        }
        if (!this.action && this.action_end_time && time >= this.action_end_time) {
            if (!this.action_is_end) {
                this.action_is_end = true
            } else {
                this.action_is_end = false
                this.action_end_time = 0
            }
        }
    }

    setState(newState: IUnitState<Character>): void {
        if (this.current_state) {
            this.current_state.exit(this)
        }
        if (newState) {
            this.current_state = newState
            this.current_state.enter(this)
        }
    }

    public getState(): void {
        this.using_ability = undefined
        this.action_is_end = false
        this.attack_angle = undefined

        this.is_attacking = false
        this.action = false
        this.target = undefined
        this.hit = false

        if (this.is_dead) {
            this.setState(new PlayerDeadState())
        } else {
            this.setState(new PlayerIdleState())
        }
    }

    public setLastInputs(pressed: object): void {
        if (!this.can_be_controlled_by_player) {
            this.pressed = {}
        } else {
            this.pressed = pressed
        }
    }

    public emitStatusEnd(name: string): void {
        this.level.socket.send(this.id, 'status_end', name)
    }
}
