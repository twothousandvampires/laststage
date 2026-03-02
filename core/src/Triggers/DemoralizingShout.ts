import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class DemoralizingShout implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 40
    name: string = 'demoralizing shout'
    description: string = 'Reduce pierce rating of nearby enemies'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) { 
        player.level.createEffect(player, 'quake')
        
        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(player, elem, 12) <= 12){
                elem.pierce -= 12
            }
        })
    }
}