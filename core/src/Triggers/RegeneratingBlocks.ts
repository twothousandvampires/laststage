import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class RegeneratingBlocks implements ITrigger {

    cd: number = 1500
    last_trigger_time: number = 0
    chance: number = 3
    name: string = 'regenerating blocks'
    description: string = 'When you block you have a chance to gain life'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addLife()
    }
}