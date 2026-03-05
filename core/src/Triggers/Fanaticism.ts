import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'
import FanaticismStatus from '../Status/FanaticismStatus'

export default class Fanaticism implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    name: string = 'fanaticism'
    description: string = 'After killing 4 enemies, increase your spirit by 5 for 5 seconds'
    chance: number = 100
    count: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return
        
        this.count ++ 
        if(this.count >= 4){
            let s = new FanaticismStatus(player.getTime())
            s.setDuration(5000)
            player.level.setStatus(player, s, true)
            this.count = 0
        }
    }
}