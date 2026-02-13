import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import FireExplosion from '../Objects/Effects/FireExplosion'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class ExplodingMeat implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'exploding meat'
    description: string = 'You explode all bodies in impact radius'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        let radius = player.impact_radius

        let targets = player.level.enemies.filter(e => e.is_corpse && e.can_be_removed && Func.distance(target, e, radius) <= radius)

        targets.forEach(elem => {
            let e = new FireExplosion(player.level)
            e.setPoint(elem.x, elem.y)
    
            player.level.effects.push(e)
    
            let box = elem.getBoxElipse()
            box.r = 6
    
            player.level.enemies.forEach(elem2 => {
                if (!elem2.is_dead && Func.elipseCollision(elem2.getBoxElipse(), box)) {
                    elem2.takeDamage(player, {})
                }
            })
    
            player.level.deleted.push(elem.id)
            player.level.removeEnemy(elem)
        })
    }
}