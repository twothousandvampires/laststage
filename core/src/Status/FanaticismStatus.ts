import Character from '../Objects/src/Character'
import Status from './Status'

export default class FanaticismStatus extends Status {
    name: string

    constructor(public time: number) {
        super(time)
        this.name = 'fanaticism'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.spirit += 5
            this.unit.newStatus({
                name: 'fanaticism',
                duration: this.duration,
                desc: 'spirit is increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.spirit -= 5
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'fanaticism',
            duration: this.duration,
            desc: 'spirit is increased',
        })
    }
}