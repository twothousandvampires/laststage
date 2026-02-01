import Func from "../Func";
import Item from "../Items/Item";
import Character from "../Objects/src/Character";

export enum JewelItemType {
    Weapon = 1,
    Armour = 2,
    Accessory = 3,
    All = 4
}
export enum JewelStats {
    Main = 1,
    Surv = 2,
    Misc = 3,
    Speed = 4,
    Bless = 5
}

export default class Jewel{
    static statValue: {} = {
        1: 
        [   
            {
                stat: 'pierce',
                stat_name: 'pierce',
                value: 3
            },
            {
                stat: 'armour_rate',
                stat_name: 'armour',
                value: 2
            },
            {
                stat: 'crushing_rating',
                stat_name: 'crushing',
                value: 1
            },
            {
                stat: 'critical',
                stat_name: 'critical chance',
                value: 1
            },
            {
                stat: 'impact',
                stat_name: 'impact',
                value: 1
            },
            {
                stat: 'power',
                stat_name: 'power',
                value: 1
            },
        ],
        2:
        [
            {
                stat: 'fortify',
                stat_name: 'fortification',
                value: 1
            },
            {
                stat: 'avoid_damage_chance',
                stat_name: 'avoid damage',
                value: 1
            },
            {
                stat: 'spirit',
                stat_name: 'spirit',
                value: 1
            },
            {
                stat: 'base_regeneration_time',
                stat_name: 'regeneration',
                value: -50
            },
        ],
        3:
        [
            {
                stat: 'vampiric_rate',
                stat_name: 'vampiric',
                value: 1
            },
            {
                stat: 'cooldown_redaction',
                stat_name: 'cd reduction',
                value: 1
            },
            {
                stat: 'chance_to_block',
                stat_name: 'block chance',
                value: 1
            },
            {
                stat: 'status_resistance',
                stat_name: 'resist',
                value: 1
            },
            {
                stat: 'gold',
                stat_name: 'gold',
                value: 10
            }
        ],
        4:
        [
            {
                stat: 'attack_speed',
                stat_name: 'attack speed',
                value: -10
            },
            {
                stat: 'cast_speed',
                stat_name: 'cast speed',
                value: -10
            },
            {
                stat: 'move_speed_penalty',
                stat_name: 'move speed',
                value: 1
            },
            {
                stat: 'base_move_speed_penalty_when_action',
                stat_name: 'free action',
                value: -1
            },
        ],
        5:
        [
            {
                stat: 'chance_to_instant_kill',
                stat_name: 'sacred strike',
                value: 1
            },
            {
                stat: 'can_regen_more_life_chance',
                stat_name: 'blessed blood',
                value: 1
            },
            {
                stat: 'chance_to_trigger_additional_time',
                stat_name: 'double trigger',
                value: 1
            },
            {
                stat: 'grace',
                stat_name: 'grace',
                value: 1
            }
        ]
    }
    power: number = 1
    id: string = Math.random() + ''
    sparks: number = 100
    public readonly itemType: JewelItemType
    public readonly statCategory: JewelStats
    public name = ''
    public description = ''
    public readonly stat: {
        stat: keyof Character,
        value: number
    }

   

    static createRandom(sparks: number = 100): Jewel {
        const randomEnum = <T>(e: T): T[keyof T] => {
            const values = Object.values(e).filter(v => typeof v === 'number') as unknown as T[keyof T][];
            return values[Math.floor(Math.random() * values.length)];
        };

        return new Jewel(
            randomEnum(JewelItemType),
            randomEnum(JewelStats),
            sparks
        );
    }

    constructor(
        itemType: JewelItemType,
        statCategory: JewelStats,
        sparks: number = 100
    ) {
        this.itemType = itemType
        this.statCategory = statCategory
        this.sparks = sparks

        this.stat = Jewel.statValue[this.statCategory][Math.floor(Math.random() *  Jewel.statValue[this.statCategory].length)]
        this.generateName()
        
        this.generatePower()
        this.generateDescription()
    }

    generatePower(){
        if(Func.chance(Math.floor(this.sparks / 5))){
            this.power = 4
        }
        else if(Func.chance(Math.floor(this.sparks / 3))){
            this.power = 3
        }
        else if(Func.chance(Math.floor(this.sparks / 2))){
            this.power = 2
        }
        else{
            this.power = 1
        }  
    }

    generateDescription(){
        let result = 'Use on: '

        let on = ''
        if(this.itemType === JewelItemType.Weapon){
            on = 'Weapon'
        }
        else if(this.itemType === JewelItemType.Armour){
            on = 'Armour'
        }
        else if(this.itemType === JewelItemType.Accessory){
            on = 'Accessory'
        }
        else{
            on = 'Any item'
        }

        on += '\n Increases: ' + this.stat.stat_name

        on += '\n Power: ' + this.power

        this.description = result + on
    }

    generateName(){
        let name = ''
        if(this.itemType === JewelItemType.Weapon){
            name = 'red jewel'
        }
        else if(this.itemType === JewelItemType.Armour){
            name = 'green jewel'
        }
        else if(this.itemType === JewelItemType.Accessory){
            name = 'yellow jewel'
        }
        else{
            name = 'rainbow jewel'
        }
        this.name = name

    }

    canBeAttached(item: Item){
        return (item.type === this.itemType || this.itemType === JewelItemType.All)  && item.player
    }

    attach(item: Item){
        if(!item.player) return
        
        let v: number = this.stat.value * this.power
        let c = item.forge.length
        if(c === 0){
            c = 1
        }
        v = c * v
        
        item.player[this.stat.stat] += v
    }
}