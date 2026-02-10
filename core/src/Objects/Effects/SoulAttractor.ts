import Level from '../../Level'
import Effect from './Effects'

export default class SoulAttractorEffect extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'soul attractor'
    }
}