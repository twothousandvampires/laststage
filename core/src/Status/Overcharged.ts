import Character from '../Objects/src/Character'
import Status from './Status'

export default class Overcharged extends Status {
    constructor(public time: number) {
        super(time)
    }

    apply(unit: any) {
        this.unit = unit

        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.critical += 100

            this.unit.newStatus({
                name: 'overcharge',
                duration: this.duration,
                desc: 'critical chance is 100%',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.critical -= 100
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'overcharge',
            duration: this.duration,
            desc: 'critical chance is 100%',
        })
    }
}