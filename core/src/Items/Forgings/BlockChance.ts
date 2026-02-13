import Item from '../Item'
import Forging from './Forging'

export default class BlockChance extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'block chance'
        this.description = 'Increases the block chance'
        this.gold_cost = 10
    }

    forge() {
        if (this.canBeForged() && this.costEnough()) {
            this.value += 1
            this.item.player.chance_to_block += 1
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
