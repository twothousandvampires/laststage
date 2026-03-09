import Level from '../../Level'
import Effect from './Effects'

export default class Guider extends Effect {
    
    entered: any[]  = []

    constructor(level: Level) {
        super(level)
        this.name = 'guider'

        this.box_r = 1.8
        this.zone_id = 1
        this.x = 160
        this.y = 23
    }

    act(time: number) {
        
    }
}