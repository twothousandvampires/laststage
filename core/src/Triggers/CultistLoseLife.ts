import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import Cultist from '../Objects/src/PlayerClasses/Cultist'
import SoulHarvester from '../Status/SoulHarvester'

export default class CultistLoseLife implements ITrigger {

    cd: number = 0
    last_trigger_time: number = 0
    name: string = 'crystilizing hits'
    description: string = 'Provides a chance to inflict fragility on enemies in a small radius on hit'

    constructor(public chance: number = 100) {}

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Cultist, target: any) {
        if(!target) return
        
        if(!target.is_dead){
            target.drainSoul(5000)
        }
    
        let s = new SoulHarvester(player.level.time)
        s.setDuration(5000)
        player.level.setStatus(player, s, true)
    }
}