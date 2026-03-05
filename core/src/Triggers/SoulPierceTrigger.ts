import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class SoulPierceTrigger implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'soul pierce'
    description: string = 'Get a ward'
    chance: number = 25

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        player.addWard(1)
    }
}