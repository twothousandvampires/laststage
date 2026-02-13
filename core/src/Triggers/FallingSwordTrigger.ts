import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import FallingSwordEffect from '../Objects/Effects/FallingSwordEffect'
import Character from '../Objects/src/Character'

export default class FallingSwordTrigger implements ITrigger {

    cd: number = 3000
    last_trigger_time: number = 0
    radius: number = 14
    chance: number = 0
    name: string = 'falling swords'
    description: string = 'swords fall on enemies'
    count: number = 1

    getTriggerChance(): number {
        return 100
    }

    trigger(player: Character, target: any) {
        let targets = player.level.enemies.filter(enemy => !enemy.is_dead && Func.distance(player, enemy, this.radius) <= this.radius)
        targets = targets.slice(0, this.count)

        targets.forEach( (enemy) => {
            let effect = new FallingSwordEffect(player.level)
            effect.target = enemy
            effect.setPoint(enemy.x, enemy.y)
            effect.setOwner(player)

            player.level.binded_effects.push(effect)
        })
    }
}