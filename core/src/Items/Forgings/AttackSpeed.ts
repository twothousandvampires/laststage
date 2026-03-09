import Character from '../../Objects/src/Character'
import Item from '../Item'
import Forging from './Forging'

export default class AttackSpeed extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 120
        this.name = 'attack speed'
        this.description = 'increases your attack speed'
        this.gold_cost = 2
        this.stat = 'attack_speed'
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            this.value += 10
            this.item.player.attack_speed -= 10
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
