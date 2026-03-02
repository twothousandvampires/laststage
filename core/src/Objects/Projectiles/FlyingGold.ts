import Func from '../../Func'
import Level from '../../Level'
import Projectiles from './Projectiles'

export default class FlyingGold extends Projectiles {
    w: number
    constructor(level: Level) {
        super(level)
        this.box_r = 0.8
        this.name = 'flying gold'
        this.move_speed = 1.2
        this.w = 2
    }

    act(time: number): void {
        if(this.isOutOfMap()) {
            this.impact()
            return
        }

        for (let i = 0; i < this.level.enemies.length; i++) {
            let e = this.level.enemies[i]

            if (!e.is_dead && Func.elipseCollision(this.getBoxElipse(), e.getBoxElipse())) {
                e.takeDamage(this.owner, {})
                this.impact()
                return
            }
        }

        this.moveAct()
    }
}