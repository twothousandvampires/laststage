import Character from '../../Objects/src/Character'
import TurnOffIronTrigger from '../../Triggers/TurnOffIronTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class TurnOffIron extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 50
        this.name = 'torn off iron'
        this.description = 'When you deal hit, there is a chance to create piece of iron shard that spins around you'
        this.gold_cost = 12
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_hit.find( elem => elem instanceof TurnOffIronTrigger)

            if (trigger) {
                trigger.chance += 5
            } else {
                let t = new TurnOffIronTrigger()
                t.chance = 5
                player.triggers_on_hit.push(t)
            }
            this.value += 5
            this.payCost()      
        }
    }

    getValue() {
        return this.value + '%'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}