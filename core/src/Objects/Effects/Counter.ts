import Level from '../../Level'
import Effect from './Effects'

export default class Counter extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'counter'
    }
}