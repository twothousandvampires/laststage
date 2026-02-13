import Level from '../../Level'
import Effect from './Effects'

export default class BonesHit extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'bones hit'
    }
}