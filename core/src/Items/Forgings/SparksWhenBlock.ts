import Character from '../../Objects/src/Character'
import SparksWhenBlockTrigger from '../../Triggers/SparksWhenBlockTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class SparksWhenBlock extends Forging {

    value: number = 1
    trigger: any

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'charged shield'
        this.description = 'Releases sparks when you block'
        this.gold_cost = 2
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            if (!this.trigger) {
                this.trigger = new SparksWhenBlockTrigger()
                player.triggers_on_block.push(this.trigger)
            }
            this.trigger.count += 1

            this.payCost()
            this.value += 1
        }
    }

    getValue() {
        return this.value + ' sparks'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}