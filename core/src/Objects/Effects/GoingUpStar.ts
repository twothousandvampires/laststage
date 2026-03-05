import Level from '../../Level'
import Effect from './Effects'

export default class GoingUpStar extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'star'
    }

    act(time: number): void {
        this.z ++
        this.wasChanged()
        
        if(this.z >= 12){
            this.delete()
        }
    }
}
