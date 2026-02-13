import Level from '../../Level'
import Effect from './Effects'

export default class FloorBlood extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'floor blood'
    }
}
