import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import BoilingBloodEffect from '../Objects/Effects/BoilingBloodEffect'
import Character from '../Objects/src/Character'

export default class BoilingBloodTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'boiling blood'
    description: string = 'There is a chance to create spheres that will target the enemy and deal damage to them'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(!target) return
        if(Func.distance(target, player) > 8) return

        let aa = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(elem, target) <= 14).slice(0, 4)
      
        let zones = 6.28 / aa.length

        for (let i = 0; i < aa.length; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let a = Math.random() * (max_a - min_a) + min_a

            let l = 1 - Math.abs(0.5 * Math.cos(a))

            let n_x = Math.sin(a) * l * Func.random(1, 3)
            let n_y = Math.cos(a) * l * Func.random(1, 3)

            let e = new BoilingBloodEffect(player.level)

            e.setOwner(player)
            e.setTarget(aa[0])
            e.setPoint(target.x + n_x, target.y + n_y)

            player.level.binded_effects.push(e)
        }
    }
}