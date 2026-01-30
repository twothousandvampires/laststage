import Func from '../../Func'
import Level from '../../Level'
import Unit from '../src/Unit'
import Effect from './Effects'

export default class BoilingBloodEffect extends Effect {

    time: number
    target: any
    activated: boolean = false

    constructor(
        level: Level,
    ) {
        super(level)
        this.name = 'boiling blood'
        this.time = level.time
        this.box_r = 1
        this.move_speed = 0.15
    }

    setTarget(target: Unit){
        this.target = target
    }

    act(time: number) {
        if(time - this.time >= 900){
            this.activated = true
        }
        if (time - this.time >= 6000) {
            this.delete()
            return
        }
        else if(this.target && this.activated){
            if(Func.elipseCollision(this.getBoxElipse(), this.target.getBoxElipse())){
                this.target.takeDamage(this.owner, {})
                
                this.delete()
                return
            }
            let angle = Func.angle(this.x, this.y, this.target.x, this.target.y)
            let l = 1 - Math.abs(0.5 * Math.cos(angle))

            let n_x = Math.sin(angle) * l
            let n_y = Math.cos(angle) * l

            n_x *= this.move_speed
            n_y *= this.move_speed

            this.addToPoint(n_x, n_y)
            this.wasChanged()
        }    
    }
}