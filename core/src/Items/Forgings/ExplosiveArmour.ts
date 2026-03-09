import Character from '../../Objects/src/Character'
import ExplodeWhenArmourHit from '../../Triggers/ExplodeWhenArmourHit'
import Item from '../Item'
import Forging from './Forging'

export default class ExplosiveArmour extends Forging {
    value: number = 0
    trigger: any

    constructor(item: Item) {
        super(item)
        this.max_value = 100
        this.name = 'explosive armour'
        this.description = 'Gives a chance to create an explosion around you when you block a hit with armour'
        this.gold_cost = 1
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            if (this.canBeForged() && this.costEnough()) {
                if (!this.trigger) {
                    this.trigger = new ExplodeWhenArmourHit()
                    player.triggers_on_armour_hit.push(this.trigger)
                }
                this.trigger.chance += 10

                this.payCost()
                player.armour_rate += 1
                this.value += 10
            }
        }
    }

    removeEffect(player: Character): void {
        player.triggers_on_armour_hit = player.triggers_on_armour_hit.filter(elem => !(elem instanceof this.trigger))
    }

    getValue() {
        return this.value + '%'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}
