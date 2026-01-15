import Func from '../Func'
import FrostExplosionSmall from '../Objects/Effects/FrostExplosionSmall'
import Status from './Status'

export default class IcePresenceStatus extends Status {
    chance: number

    constructor(time: number) {
        super(time)
        this.name = 'ice presence'
        this.chance = 0
    }

    apply(unit: any) {
        this.unit = unit
    }

    act(tick_time: number) {
        if (tick_time > this.last_checked) {
            this.last_checked += 1500

            if (!this.unit) return

            this.unit.level.enemies.forEach(elem => {
                if (elem.freezed && Func.distance(this.unit, elem) <= 15) {
                    
                    let e = new FrostExplosionSmall(elem.level)
                    e.setPoint(elem.x, elem.y)
                    elem.level.addEffect(e)

                    elem.takePureDamage(this.unit, {
                        ignore_armour: true
                    })
                }
            })
        }
    }

    update(status: any): void {
        this.power += status.power
    }
}
