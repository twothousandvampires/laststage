import Level from '../../Level'
import Effect from './Effects'

export default class ReignEffect extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'reign'
    }
}