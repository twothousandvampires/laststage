import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import QuakeEffect from '../Objects/Effects/Quake'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class FlyerCounterTrigger implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    name: string = 'magic wave'
    description: string = 'deals damage around you'

    constructor(public chance: number = 100) {

    }

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        console.log('coutner')
        let e = new QuakeEffect(player.level)
        e.setPoint(player.x, player.y)

        player.level.addEffect(e)

        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(elem, player) <= 10){
                elem.takeDamage(player, {})
            }
        })
    }
}