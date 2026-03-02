import Character from '../../Objects/src/Character'
import IceHatredTrigger from '../../Triggers/IceHatredTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class IceHatred extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'freeze on critical'
        this.description = 'When you land a critical hit, you release streaks of ice that freeze enemies for an extended time'
        this.gold_cost = 2
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_critical.find( elem => elem instanceof IceHatredTrigger)

            if (trigger) {
                trigger.radius += 2
                this.value += 2
            } else {
                let t = new IceHatredTrigger()
        
                player.triggers_on_critical.push(t)
            }

            this.payCost()      
        }
    }

    getValue() {
        return this.value + ' additional radius'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}