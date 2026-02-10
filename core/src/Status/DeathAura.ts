import Func from '../Func'
import DeathAuraEffect from '../Objects/Effects/DeathAuraEffect'
import Status from './Status'

export default class DeathAura extends Status {
    chance: number
    last_checked: number = Date.now()
    constructor(time: number) {
        super(time)
        this.name = 'death aura'
        this.chance = 50
    }

    apply(unit: any) {
        this.unit = unit
    }

    act(tick_time: number) {
        if (tick_time > this.last_checked) {
            this.last_checked += 4000
            if (!this.unit) return

            let second = this.unit.getSecondResource()
            this.unit.level.enemies.forEach(elem => {
                if (Func.chance(second * 2) && !elem.is_dead && Func.distance(this.unit, elem) <= 12) {
                    elem.takePureDamage(this.unit, {
                        ignore_armour: true
                    })
                }
            })

            let e = new DeathAuraEffect(this.unit.level)
            e.setPoint(this.unit.x, this.unit.y)

            this.unit.level.addEffect(e)
        }
    }
}
