import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class ConductOfPain implements ITrigger {

    cd: number = 3000
    last_trigger_time: number = 0
    chance: number = 30
    name: string = 'conduct of pain'
    description: string = 'You have a chance to get energy when you block hit'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        player.addResourse()
    }
}