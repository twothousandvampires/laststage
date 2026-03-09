import Character from '../../Objects/src/Character'
import FallingSwordTrigger from '../../Triggers/FallingSwordTrigger'
import Item from '../Item'
import Forging from './Forging'

export default class FallingSwords extends Forging {
    value: number = 1

    constructor(item: Item) {
        super(item)
        this.max_value = 10
        this.name = 'sword rain'
        this.description = 'When you block, swords fall on enemies'
        this.gold_cost = 2
    }

    forge(player: Character) {
        if (this.canBeForged() && this.costEnough()) {
            let trigger = player.triggers_on_block.find( elem => elem instanceof FallingSwordTrigger)

            if (trigger) {
                trigger.count += 1
                this.value += 1
            } else {
                let t = new FallingSwordTrigger()
        
                player.triggers_on_block.push(t)
            }

            this.payCost()      
        }
    }

    removeEffect(player: Character): void {
        player.triggers_on_block = player.triggers_on_block.filter(elem => !(elem instanceof FallingSwordTrigger))
    }
    
    getValue() {
        return this.value + ' swords'
    }

    canBeForged(): boolean {
        if (!this.item || !this.item.player) return false

        return this.value < this.max_value
    }
}