import Item from '../Item'
import Forging from './Forging'

export default class Perception extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'ingenuity'
        this.description = 'increases your ingenuity'
        this.gold_cost = 6
    }

    forge() {
        if (this.canBeForged() && this.costEnough()) {
            this.value += 1
            this.item.player.ingenuity += 1
            this.payCost()
        }
    }

    getValue() {
        return this.value
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}
