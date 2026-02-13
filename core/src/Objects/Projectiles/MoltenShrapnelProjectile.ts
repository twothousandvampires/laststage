import Func from '../../Func'
import Level from '../../Level'
import Ignite from '../../Status/Ignite'
import Projectiles from './Projectiles'

export default class MoltenShrapnelProjectile extends Projectiles {
    w: number
    hited: any[] = []
    
    constructor(level: Level) {
        super(level)
        this.box_r = 0.8
        this.name = 'molten burst'
        this.move_speed = 0.7
        this.w = 2
    }

    act(): void {
        if(this.isOutOfMap()) {
            this.impact()
            return
        }

        for (let i = 0; i < this.level.enemies.length; i++) {
            let e = this.level.enemies[i]

            if (!e.is_dead && !this.hited.includes(e.id) && Func.elipseCollision(this.getBoxElipse(), e.getBoxElipse())) {
                this.hited.push(e.id)
                let s = new Ignite(this.level.time)
                s.setDuration(5000)
                s.setPower(40)
                
                e.level.setStatus(e, s, true)
            }
        }

        this.moveAct()
    }
}
