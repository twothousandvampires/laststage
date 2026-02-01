import Character from '../../Objects/src/Character'
import BloodyVinesTrigger from '../../Triggers/BloodyVinesTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class BloodySpell extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 40
        this.name = 'bloody spell'
        this.description = 'When you lose life, there is a chance to create 4 blood vines from their body that damage enemies'
        this.gold_cost = 5
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_lose_life.find( elem => elem instanceof BloodyVinesTrigger)

            if (trigger) {
                trigger.chance += 4
            } else {
                let t = new BloodyVinesTrigger()
                t.chance = 4

                player.triggers_on_lose_life.push(t)
            }

            this.payCost()
            this.value += 4
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