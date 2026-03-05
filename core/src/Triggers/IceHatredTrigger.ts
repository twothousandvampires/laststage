import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import StreaksOfIceEffect from '../Objects/Effects/StreaksOfIceEffect'
import Character from '../Objects/src/Character'

export default class IceHatredTrigger implements ITrigger {

    cd: number = 7000
    last_trigger_time: number = 0
    radius: number = 8
    chance: number = 0
    name: string = 'ice hatred'
    description: string = 'There is a chance to create spheres that target the enemy and deal damage to them'

    getTriggerChance(): number {
        return 100
    }

    trigger(player: Character, target: any) {
        if(!target) return
        
        let e = new StreaksOfIceEffect(player.level)
        e.setPoint(target.x, target.y)
        player.level.addEffect(e)

        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(elem, target) <= this.radius){
                elem.setFreeze(10000)
            }
        })
    }
}