import Character from '../../Objects/src/Character'
import BoilingBloodTrigger from '../../Triggers/BoilingBloodTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class BoilingBlood extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'boiling blood'
        this.description = 'When you kill an enemy near you, there is a chance to create spheres that will target the enemy and deal damage to them'
        this.gold_cost = 2
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_kill.find( elem => elem instanceof BoilingBloodTrigger)

            if (trigger) {
                trigger.chance += 1
            } else {
                let t = new BoilingBloodTrigger()
                t.chance = 1

                player.triggers_on_kill.push(t)
            }

            this.payCost()
            this.value += 1
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