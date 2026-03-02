import Character from '../Objects/src/Character'
import Status from './Status'

export default class FaithStatus extends Status {
    name: string

    constructor(public time: number) {
        super(time)
        this.name = 'faith'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.spirit += 20
            this.unit.newStatus({
                name: 'faith',
                duration: this.duration,
                desc: 'spirit is increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.spirit -= 20
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'faith',
            duration: this.duration,
            desc: 'spirit is increased',
        })
    }
}
