import Level from '../../Level'
import Effect from './Effects'

export default class Regen extends Effect {

    state: number = 1
    start: number = 0
    constructor(level: Level) {
        super(level)
        this.name = 'regen'
        this.z = 10
    }
}