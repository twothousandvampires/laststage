import Level from '../../Level'
import Effect from './Effects'

export default class DeathAuraEffect extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'death aura'
    }
}
