import Level from '../../Level'
import Effect from './Effects'

export default class HitSpark extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'hit spark'
    }
}
