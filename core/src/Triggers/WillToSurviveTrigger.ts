import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class WillToSurviveTrigger implements ITrigger {
    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 15
    name: string = 'will to survive'
    description: string = 'When you parry, there is a chance to get courage'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addLife(1)
    }
}