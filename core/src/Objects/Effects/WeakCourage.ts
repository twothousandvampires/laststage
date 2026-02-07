import Level from '../../Level'
import Effect from './Effects'

export default class WeakCourage extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'weak courage'
    }
}