import Character from '../Objects/src/Character'
import Status from './Status'

export default class DismembermentStatus extends Status {
    constructor(public time: number) {
        super(time)
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.critical += 30
            this.unit.power += 20
            this.unit.statusWasApplied()


            this.unit.newStatus({
                name: 'devouring',
                duration: this.duration,
                desc: 'power and critical chance are increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.critical -= 30
            this.unit.power -= 20
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'devouring',
            duration: this.duration,
            desc: 'power and critical chance are increased',
        })
    }
}
