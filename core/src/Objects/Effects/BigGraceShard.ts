import Func from '../../Func'
import Level from '../../Level'
import Grace from '../../Status/Grace'
import Effect from './Effects'

export default class BigGraceShard extends Effect {
    time: number
    constructor(level: Level) {
        super(level)
        this.name = 'big grace shard'
        this.box_r = 4
        this.time = Date.now()
    }

    act(time: number) {
        if (time - this.time >= 10000) {
            this.delete()
            return
        }

        this.level.players.forEach(elem => {
            if (Func.elipseCollision(elem.getBoxElipse(), this.getBoxElipse())) {
                elem.grace += 5
                elem.changeStats(2)
                let status = new Grace(elem.level.time)
                status.setDuration(8000)

                this.level.setStatus(elem, status, true)

                this.level.deleted.push(this.id)
                this.level.binded_effects = this.level.binded_effects.filter(elem => elem != this)
            }
        })
    }
}