import Level from '../../Level'
import Effect from './Effects'

export default class FlyerParry extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'flyer parry'
    }
}
