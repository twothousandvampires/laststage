import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Phase from '../Status/Phase'

export default class Incorporeity implements ITrigger {

    cd: number = 5000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'inner fire'
    description: string = 'Get phasing for 3 seconds'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(!target) return
        
        let s = new Phase(player.getTime())
        s.setDuration(3000)
        player.level.setStatus(player, s, true)
    }
}