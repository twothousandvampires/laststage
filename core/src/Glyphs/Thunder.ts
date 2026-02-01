import Character from '../Objects/src/Character'
import Func from '../Func'
import LightningBoltEffect from '../Objects/Effects/LightningBoltEffect'
import { Spark } from '../Objects/Projectiles/Spark'
import Mastery from './Mastery'

export default class Thunder extends Mastery {
    constructor() {
        super()
        this.name = 'thunder'
        this.description = 'Realises a thunder that deal damage in radius and creates sparks'
    }

    async trigger(player: Character) {
        let possible = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem) <= 12)
        let t = Func.getRandomFromArray(possible)

        if(!t) return

        let l_effect = new LightningBoltEffect(player.level)
        l_effect.setPoint(t.x, t.y)

        player.level.addSound('lightning bolt', t.x, t.y)
        player.level.effects.push(l_effect)

        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(elem, t) <= 5){
                elem.takeDamage(player, {
                    burn: true
                })
            }
        })

        let count = 10
        
        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let a = Math.random() * (max_a - min_a) + min_a

            let l = 1 - Math.abs(0.5 * Math.cos(a))

            let n_x = Math.sin(a) * l * 12
            let n_y = Math.cos(a) * l * 12

            let flame = new Spark(player.level)

            flame.setOwner(player)
            flame.setPoint(player.x + n_x, player.y + n_y)
            flame.setAngle(a)

            player.level.projectiles.push(flame)
        }
    }
}