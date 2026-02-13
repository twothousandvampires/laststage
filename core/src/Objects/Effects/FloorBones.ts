import Level from '../../Level'
import Effect from './Effects'

export default class FloorBones extends Effect {
    constructor(level: Level) {
        super(level)
        this.name = 'floor bones'
    }
}