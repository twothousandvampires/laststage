import Level from '../../Level'
import Effect from './Effects'

export default class SimpleEffect extends Effect {
    constructor(level: Level, name: string) {
        super(level)
        this.name = name
    }
}