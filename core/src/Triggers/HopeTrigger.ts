import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class HopeTrigger implements ITrigger {

    cd: number = 2500
    last_trigger_time: number = 0
    chance: number = 10
    name: string = 'hope'
    description: string = 'There is a chance to gain life'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        player.addLife(1)
    }
}