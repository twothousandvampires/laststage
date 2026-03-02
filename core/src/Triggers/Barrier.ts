import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class Barrier implements ITrigger {
    cd: number = 1000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'barrier'
    description: string = 'When you gain energy and it max, you have a chance get a ward instead'
    chance: number = 10

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, value: number = 0) {  
        if(player.resource >= player.maximum_resources){
            player.addWard(1)
        }  
    }
}