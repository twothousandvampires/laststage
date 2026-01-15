import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class ServiceTrigger implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'service'
    description: string ='You have a chance to get energy when you get life'

    getTriggerChance(player: Character): number {
        return player.getSecondResource() * 4  
    }

    trigger(player: Character) {
        player.addResourse()
    }
}