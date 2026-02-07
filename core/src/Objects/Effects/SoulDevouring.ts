import Level from '../../Level'
import Effect from './Effects'

export default class SoulDevouring extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'soul devouring'
    }
}