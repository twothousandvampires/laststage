import Character from '../../Objects/src/Character'
import EnergyWeaponTrigger from '../../Triggers/EnergyWeaponTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class EnergyWeapon extends Forging {
    value: number = 0

    constructor(item: Item) {
        super(item)
        this.max_value = 45
        this.name = 'energy weapon'
        this.description = 'When you deal a critical strike there is a chance to create an energy sphere'
        this.gold_cost = 2
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_critical.find( elem => elem instanceof EnergyWeaponTrigger)

            if (trigger) {
                trigger.chance += 5
            } else {
                let t = new EnergyWeaponTrigger()
                t.chance = 5

                player.triggers_on_critical.push(t)
            }

            this.payCost()
            this.value += 5
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