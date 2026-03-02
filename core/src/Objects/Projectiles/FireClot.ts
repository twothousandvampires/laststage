import Func from '../../Func'
import Level from '../../Level'
import Projectiles from './Projectiles'

export default class FireClot extends Projectiles {
    w: number
    hited: any[] = []
    duration: number = 5000
    start: number = Date.now()
    
    constructor(level: Level) {
        super(level)
        this.box_r = 0.8
        this.name = 'molten burst'
        this.move_speed = 0
        this.w = 2
    }

    act(time: number): void {
        if(time - this.start >= this.duration) {
            this.impact()
            return
        }

        for (let i = 0; i < this.level.enemies.length; i++) {
            let e = this.level.enemies[i]

            if (!e.is_dead && Func.elipseCollision(this.getBoxElipse(), e.getBoxElipse())) {
                e.takeDamage(this.owner, {})
                this.level.createEffect(this, 'fire_explosion_medium')
                this.impact()
            }
        }
    }
}