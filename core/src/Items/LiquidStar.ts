import Character from '../Objects/src/Character'
import Item from './Item'

export default class LiquidStar extends Item{

    last_trigger_time: number = 0

    constructor() {
        super()
        this.name = 'liquid star'
        this.type = 3
        this.chance = 35
        this.cd = 1000
        this.distance = 12
        this.description = 'Increases your vision'
    }

    equip(character: Character): void {
        character.light_r += 1
    }

    disable(): void {
        this.disabled = true
        if (this.player) {
            this.player.light_r -= 1
        }
    }

    enable(): void {
        this.disabled = false
        if (this.player) {
            this.player.light_r += 1
        }
    }
}