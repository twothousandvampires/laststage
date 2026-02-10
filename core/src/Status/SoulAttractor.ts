import Func from '../Func'
import SoulAttractorEffect from '../Objects/Effects/SoulAttractor'
import SoulHarvester from './SoulHarvester'
import Status from './Status'

export default class SoulAttractor extends Status {
    chance: number
    last_checked: number = Date.now()
    constructor(time: number) {
        super(time)
        this.name = 'soul attractor'
        this.chance = 50
    }

    apply(unit: any) {
        this.unit = unit
    }

    act(tick_time: number) {
        if (tick_time > this.last_checked) {
            this.last_checked += 4000
            if (!this.unit) return
         

            this.unit.level.enemies.forEach(elem => {
                if (Func.chance(this.unit.life_status * 2) && !elem.is_dead && Func.distance(this.unit, elem) <= 12) {
                    elem.drainSoul(3000)

                    let s = new SoulHarvester(elem.level.time)
                    s.setDuration(5000)
                    this.unit.level.setStatus(this.unit, s, true)
                }
            })

            let e = new SoulAttractorEffect(this.unit.level)
            e.setPoint(this.unit.x, this.unit.y)

            this.unit.level.addEffect(e)
        }
    }
}