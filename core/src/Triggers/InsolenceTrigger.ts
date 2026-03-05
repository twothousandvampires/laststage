import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class InsolenceTrigger implements ITrigger {

    cd: number = 1500
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'insolence'
    description: string = 'Permanently increase your pierce rating by 1, up to 30'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(!target) return
        
        if(this.times >= 30){
            return
        }
        else{
            this.times ++
            player.pierce ++
        }
    }
}