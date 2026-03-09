import Character from '../../Objects/src/Character'
import ThunderStrikesTrigger from '../../Triggers/ThunderStrikesTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class ThunderStrikes extends Forging {
    value: number = 0
    trigger: any

    constructor(item: Item) {
        super(item)
        this.max_value = 7
        this.name = 'thunder strikes'
        this.description =
            'when your pierce enemy create lightning bolts that strike behind the target'
        this.gold_cost = 3
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            if (!this.trigger) {
                this.trigger = new ThunderStrikesTrigger()
                player.triggers_on_pierce.push(this.trigger)
            }
            this.trigger.count += 1
            player.pierce ++
            this.payCost()
            this.value += 1
        }
    }

    removeEffect(player: Character): void {
        player.triggers_on_pierce = player.triggers_on_pierce.filter(elem => !(elem instanceof this.trigger))
    }

    getValue() {
        return this.value + ' lightnings'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}
