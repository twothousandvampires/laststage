import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import FireExplosion from '../Objects/Effects/FireExplosion'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class FireTrapTrigger implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'Fire trap'
    description: string = 'Create a big explosion and reduce cd'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        player.action_start -= 1000

        let radius = 14
        let e = new FireExplosion(player.level)
        e.setPoint(player.x, player.y)
        player.level.addEffect(e)

        let targets = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem, radius) <= radius)

        targets.forEach(elem => {
            elem.takeDamage(player, {
                burn: true
            })
        })
    }
}