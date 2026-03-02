import Builder from '../Classes/Builder'
import Func from '../Func'
import Character from '../Objects/src/Character'
import Chance from './Forgings/Chance'
import Forging from './Forgings/Forging'

export default abstract class Item {
    
    public forge: Forging[] = []
    public distance: number = 0
    public chance: number = 0
    public player: Character | undefined
    public max_forgings: number = 4
    public type: number = 1
    public used: boolean = false
    public duration: number = 0
    public count: number = 0
    public description: string = ''
    public disabled: boolean = false
    public suggested_forgings: Forging[] = []
    public cd = 5000
    max_chance: number = 90

    toJSON() {
        return {
            forge: this.forge,
            name: this.name,
            description: this.description,
            max_forgings: this.max_forgings,
        }
    }

    static getList(){
        let result: any = []
        
        Item.list.forEach(elem => {
            if(elem?.chance && Func.chance(elem.chance)){
                result.push(elem)
            }
            else if(!elem?.chance){
                result.push(elem)
            }
        })

        return result
    }

    static readonly list = [
        {
            name: 'skull of first warrior',
            description: 'Increases your power by 12 for 10 seconds after 12 kills',
        },
        {
            name: 'glacial chain',
            description:
                'after using your non-utility skill you have a 25% chance to spell Frost Wave',
        },
        {
            name: 'red potion',
            description:
                'when you reach 1 life, your life is restored to full and you gain immortality for a short period',
        },
        {
            name: 'soul accumulator',
            description: 'When your teammate dies, you gain +15 to all main stats',
        },
        {
            name: 'doom mantia',
            description:
                'when you take lethal damage, there is a chance to redirect your death to a nearby target',
        },
        {
            name: 'wall of bones',
            description:
                'if you get hit, you have a chance to receive a bone charge that increases your armor and fortification. If you reach the maximum charge (default 10), there is a chance that the charges will explode and injure enemies',
        },
        {
            name: 'flame ring',
            description: 'When you take damage, the nearest enemy takes damage',
        },
        {
            name: 'sparkling helmet',
            description: 'If you do not use any skills for 5 seconds, creates a shock ring',
        },
        {
            name: 'glass sword',
            description: 'Always deals double damage but also takes double damage',
        },
        {
            name: 'cloak',
            description: 'Gives a chance to gain phasing when taking damage',
        },
        {
            name: 'staff',
            description: 'Reduces cooldowns',
        },
        {
            name: 'charged bow',
            description: 'After hitting an enemy there is a chance to create lightning with a 2000 ms cooldown',
        },
        {
            name: 'dagger of smoke',
            description: 'When you heal, there is a chance to create blood shards',
        },
        {
            name: 'yellow stone',
            description: 'Increases chance to resist status; when you resist, you gain a ward',
        },
        {
            name: 'white shield',
            description: 'You have a chance to gain a ward when you block',
        },
        {
            name: 'emerald knife',
            description: 'Increases chance to get additional gold',
        },
        {
            name: 'whispering shield',
            description: 'Increases chance to block and... sometimes whispers strange things',
        },
        {
            name: 'twilight gloves',
            description: 'Periodically creates clots of energy on enemies',
        },
        {
            name: 'ring of transmutation',
            description: 'When hit by an enemy, there is a chance to turn them into gold',
        },
        {
            name: 'sword handle',
            description: 'You are lucky',
        },
        {
            name: 'ice belt',
            description: 'Increases maximum energy',
        },
        {
            name: 'searching heart',
            description:
                'every 10 seconds releases fireballs, the number of which depends on the health lost during this time',
        },
        {
            name: 'charged armour',
            description:
                'when you get energy there is a chance that if it is not max - you get a ward, otherwise you lose the whole ward and get set on fire',
        },
        {
            name: 'molten helm',
            description:
                'when you start blocking you ignite enemies within a radius, the power of the burn depends on your armor. it has a 15-second cooldown',
        },
        {
            name: 'soul blade',
            description: 'When you kill an enemy there is a chance to gain a ward',
        },
        {
            name: 'solar spear',
            description: 'When you pierce an enemy, you create a light nova that heals allies',
        },
        {
            name: 'crystal greaves',
            description:
                'You are fragile while you stand, nearby enemies are frigile when you move',
        },
        {
            name: 'flying shards',
            description:
                'When you block hit with armour there is a chance to realise metal shards to enemies',
        },
        {
            name: 'pale blade',
            description:
                'when you hit enemy there is a chance to summon spectral blade which will fight on you side',
        },
        {
            name: 'crossbow',
            description: 'When you deal critical damage, there is a chance to crush nearby enemies',
        },
        {
            name: 'royal mace',
            description: 'Increases impact, crushing and critical rating by 7',
        },
        {
            name: 'devouring axe',
            description: 'Gives you a chance to gain devouring after a kill',
        },
        {
            name: 'flamy nimbus',
            description: 'When you reach maximum energy, creates a ring that burns enemies',
        },
        {
            name: 'distorter',
            description: 'Gives a 5% chance that a trigger activates twice',
        },
        {
            name: 'crusher',
            description: 'Increases crushing rating by 5 and gives a chance that a killed crushed enemy will explode and deal damage in a radius'
        },
        {
            name: 'lizas ring',
            description: 'Get a courage when you find gold',
            chance: 1
        }
    ]

    static forging_list_all = [
        'gold find',
        'impact',
        'penetrating',
        'spirit',
        'power',
        'vampiric',  
        'armour rate',
        'resist',
        'pierce',
        'critical',   
    ]

    static forging_list_type_1 = [
        'boiling blood',
        'attack speed',
        'instant kill',
        'ignite when hit',
        'frost shpere when kill',
        'stun when hit',
        'thunder strikes',
        'dominance when critical',
        'fragility on hit',
        'storm presence',
        'energy weapon',
        'falling swords'
    ]

    static forging_list_type_2 = [
        'bloody spell',
        'regen time',
        'block chance',
        'freeze when hited',
        'sparks when block',
        'shock nova when armour',
        'explosive armour',
        'fire presence',
        'fortify when hit',
        'enchanted armour',
        'torn off iron'
    ]

    static forging_list_type_3 = [
        'ice hatred',
        'max resources',
        'cooldown reduction',
        'blessed life',
        'cast speed',
        'lightning when use skill',
        'overcharge',
        'ice presence',
        'cold heart',
        'gift of enlightenment',
        'soul pulling',
        'charisma',
    ]

    name: string = ''

    constructor() {}

    getSpecialForgings(): string[] | [] {
        return []
    }

    abstract equip(character: Character): void

    // abstract forge(character: Character): void

    canBeForged(character: Character) {
        return true
    }

    setPlayer(player: Character) {
        this.player = player

        if(this.type === 1){
            player.pierce += Func.random(1, 4)
        }
        else if(this.type === 2){
            player.armour_rate += Func.random(1, 4)
        }
        else{
            player.base_regeneration_time -= 150
        }

        this.equip(this.player)
    }

    disable() {
        this.disabled = true
    }

    enable() {
        this.disabled = false
    }

    pick(id: number) {
        let forging = this.suggested_forgings[id]

        this.player.gold += forging.gold_cost
        forging.forge(this.player)
        
        this.forge.push(forging)

        this.suggested_forgings = []
    }

    pickRandomForging(){
        let forging = Func.getRandomFromArray(this.suggested_forgings)

        if(!forging) return

        this.player.gold += forging.gold_cost
        forging.forge(this.player)

        this.forge.push(forging)
        
        this.suggested_forgings = []
    }

    public unlockForgings(): boolean {
        if (this.forge.length >= this.max_forgings) return false
        if (this.suggested_forgings.length != 0) return false

        let count = 5 - this.forge.length

        if(count < 2){
            count = 2
        }

        for (let i = 0; i < count; i++) {
            let f = this.getRandomForging()
            if (this.suggested_forgings.some(elem => elem.name === f.name)) {
                i--
            } else {
                this.suggested_forgings.push(f)
            }
        }

        return true
    }

    getRandomForging() {
        let all = [...Item.forging_list_all]

        if (this.type === 1) {
            all = all.concat(...Item.forging_list_type_1)
        } else if (this.type === 2) {
            all = all.concat(...Item.forging_list_type_2)
        } else if (this.type === 3) {
            all = all.concat(...Item.forging_list_type_3)
        }

        all = all.concat(...this.getSpecialForgings())

        let random: string = all[Math.floor(Math.random() * all.length)]

        let forging = Builder.createForging(random, this)

        while (this.forge.some(elem => elem instanceof forging.constructor)) {
            random = all[Math.floor(Math.random() * all.length)]

            forging = Builder.createForging(random, this)
        }

        return forging
    }
}
