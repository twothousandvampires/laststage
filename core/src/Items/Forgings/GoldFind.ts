import Item from '../Item'
import Forging from './Forging'

export default class GoldFind extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 20
        this.name = 'gold find'
        this.description = 'Increases chance to get additional gold'
        this.gold_cost = 1
        this.stat = 'chance_to_get_additional_gold'
    }

    forge() {
        if (this.canBeForged() && this.costEnough()) {
            this.value += 2
            this.item.player.chance_to_get_additional_gold += 2

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
