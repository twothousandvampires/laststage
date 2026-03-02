import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class CorrosiveBlows implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 15
    name: string = 'corrosive blows'
    description: string = 'Gives a chance to reduce the armor of enemies near the target on hit'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(!target) return
        
        player.level.createEffect(target, 'plague bomb explode')
        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(target, elem, 12) <= 12){
                elem.armour_rate -= 12
            }
        })
    }
}