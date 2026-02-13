import Level from '../../Level'
import Effect from './Effects'

export default class FallingSwordEffect extends Effect {
    z_add: number = 0
    target: any
    constructor(level: Level) {
        super(level)
        this.name = 'falling sword'
        this.z = 12
    }

    act(time: number): void {
        if(!this.target || this.target.is_dead) {
            this.delete()
        }

        if(this.z <= 5){
            this.target.takeDamage(this.owner, {})
            this.delete()
        }

        this.x = this.target.x
        this.y = this.target.y
        this.wasChanged()

        this.z -= this.z_add
        this.z_add += 0.1
    }
}
