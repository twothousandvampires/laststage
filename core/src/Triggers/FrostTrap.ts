import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import FrostExplosionBig from '../Objects/Effects/FrostExplosionBig'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class FrostTrap implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'Frost trap'
    description: string = 'Freeze enemies and reduce action cooldown by 1 sec'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        player.action_start -= 1000

        let radius = 16
        let e = new FrostExplosionBig(player.level)
        e.setPoint(player.x, player.y)
        player.level.addEffect(e)

        let targets = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem, radius) <= radius)

        targets.forEach(elem => {
            elem.setFreeze(3000)
        })
    }
}