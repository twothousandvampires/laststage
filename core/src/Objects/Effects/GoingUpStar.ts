import Level from '../../Level'
import Effect from './Effects'

export default class GoingUpStar extends Effect {
    a: number = 0
    m: number = 0
    constructor(level: Level) {
        super(level)
        this.name = 'star'
    }

    act(time: number): void {
                
        this.setPoint(this.x + Math.sin(this.a) / 2, this.y + Math.cos(this.a) / 2)
        this.wasChanged()
        this.m ++

        if(this.m >= 60){
            this.delete()
        }
    }

    setAngle(a){
        this.a = a
    }
}
