import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'
import Fortify from '../Status/Fortify'

export default class Growths implements ITrigger {

    cd: number = 3000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'growths'
    description: string = 'When you take damage, increase your armor by 1, up to 20. If you already have 20 armor this way, gain the fortification buff'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        if(this.times >= 20){
            let s = new Fortify(player.level.time)
            s.setDuration(5000)
            player.level.setStatus(player, s, true)
        }
        else{
            this.times ++
            player.armour_rate ++
        }
    }
}