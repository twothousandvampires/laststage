import Character from '../../Objects/src/Character'
import Item from '../Item'
import Forging from './Forging'

export default class InstantKill extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 7
        this.name = 'sacred strike'
        this.description = 'Increases chance to instantly kill'
        this.gold_cost = 4
        this.stat = 'chance_to_instant_kill'
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            this.value += 1
            this.item.player.chance_to_instant_kill += 1
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
