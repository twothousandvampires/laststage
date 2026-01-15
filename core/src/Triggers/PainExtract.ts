import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class PainExtract implements ITrigger {

    cd: number = 1500
    last_trigger_time: number = 0
    chance: number = 3
    name: string = 'pain extract'
    description: string = 'You have a chance to get energy when you kill enemy'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addResourse()
    }
}