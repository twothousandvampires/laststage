import Func from '../../Func'
import Level from '../../Level'
import Effect from './Effects'

export default class BloodyVinesEffect extends Effect {

    time: number

    constructor(
        level: Level,
        public start_power: number = 0
    ) {
        super(level)
        this.name = 'bloody vines'
        this.time = level.time
        this.box_r = 12
    }

    act(time: number) {
        if (time - this.time >= 750) {
            this.level.enemies.forEach(elem => {
                if (!elem.is_dead && Func.elipseCollision(elem.getBoxElipse(), this.getBoxElipse())) {
                    elem.takeDamage(this.owner, {})
                }
            })

            this.delete()
        }    
    }
}
