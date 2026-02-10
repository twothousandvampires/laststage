import Func from '../../Func'
import { Bone } from '../../Objects/Projectiles/Bone'
import Cultist from '../../Objects/src/PlayerClasses/Cultist'
import Ability from '../Ability'
import CultistAbility from './CultistAbility'

export default class ShatterShell extends CultistAbility {
    pack: boolean = false
    lesson: boolean = false
    spreading: boolean = false

    constructor(owner: Cultist) {
        super(owner)
        this.cd = 12000
        this.name = 'shatter-shell'
        this.type = Ability.TYPE_INSTANT
        this.mastery_chance = 25
    }

    impact(): void {
        this.used = true

        let targets = this.owner.level.enemies.filter(elem => !elem.soul && !elem.is_dead && Func.distance(this.owner, elem, 14) <= 14)

        targets.forEach(elem => {
            let count = 3
            
            elem.armour_rate = 0
            elem.life_status = 1

            elem.takeDamage(this.owner, {
                explode: true,
            })

            let zones = 6.28 / count

            for (let i = 1; i <= count; i++) {
                let min_a = (i - 1) * zones
                let max_a = i * zones

                let angle = Math.random() * (max_a - min_a) + min_a
                let proj = new Bone(elem.level)
                proj.setAngle(angle)
                proj.setPoint(elem.x, elem.y)

                elem.level.projectiles.push(proj)
            }
        })

        this.afterUse()
    }
}
