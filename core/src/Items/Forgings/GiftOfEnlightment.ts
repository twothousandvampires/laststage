import Character from '../../Objects/src/Character'
import GiftOfEnlightmentGrigger from '../../Triggers/GiftOfEnlightmentGrigger'
import Item from '../Item'
import Forging from './Forging'

export default class GiftOfEnlightment extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 100
        this.name = 'gift of enlightenment'
        this.description = 'When you become enlightened, there is a chance to create grace'
        this.gold_cost = 1
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_enlight.find( elem => elem instanceof GiftOfEnlightmentGrigger)

            if (trigger) {
                trigger.chance += 10
            } else {
                let t = new GiftOfEnlightmentGrigger()
                t.chance = 10

                player.triggers_on_enlight.push(t)
            }

            this.payCost()
            this.value += 20
        }
    }

    removeEffect(player: Character): void {
        player.triggers_on_enlight = player.triggers_on_enlight.filter(elem => !(elem instanceof GiftOfEnlightmentGrigger))
    }

    getValue() {
        return this.value
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}