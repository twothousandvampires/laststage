import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Item from './Item'

export default class WhiteShield extends Item implements ITrigger {
    last_trigger_time: number = 0

    constructor() {
        super()
        this.chance = 40
        this.name = 'white shield'
        this.type = 2
        this.description = 'You have a chance to gain a ward when you block'
    }

    getTriggerChance(): number {
        return this.chance
    }

    getSpecialForgings(): string[] {
        return ['chance']
    }

    equip(character: Character): void {
        character.triggers_on_block.push(this)
    }

    trigger(character: Character) {
        if (this.disabled) return

        character.addWard(1)
    }
}
