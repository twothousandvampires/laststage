import Level from '../../Level'
import Effect from './Effects'

export default class HalfEnergy extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'half energy'
        this.z = 12
    }
}
