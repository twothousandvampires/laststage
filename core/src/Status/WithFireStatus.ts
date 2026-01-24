import Func from '../Func'
import Ignite from './Ignite'
import Status from './Status'

export default class WithFireStatus extends Status {
    constructor(time: number) {
        super(time)
        this.name = 'with fire status'
    }

    apply(unit: any) {
        this.unit = unit
    }

    update(status: any) {
        this.power++
    }

    act(tick_time: number) {
        if (tick_time > this.last_checked) {
            this.last_checked += 4500

            let check_distance = 25

            let area = this.unit.getBoxElipse()
            area.r = check_distance

            let targets = this.unit.level.enemies.filter(elem =>
                !elem.is_dead && Func.elipseCollision(elem.getBoxElipse(), area)
            )

            targets = targets.slice(0, Func.random(2, 5))
       
            targets.forEach(elem => {
                let s = new Ignite(elem.level.time)
                s.setDuration(5000)
                s.setPower(30)

                elem.level.setStatus(elem, s, true)
            })
        }
    }
}