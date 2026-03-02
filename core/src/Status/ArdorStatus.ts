import Character from '../Objects/src/Character'
import Status from './Status'

export default class ArdorStatus extends Status {
    name: string
    added: number = 0

    constructor(public time: number) {
        super(time)
        this.name = 'ardor'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.added = Math.round(this.unit.getTotalArmour() / 2)
            this.unit.pierce += this.added

            this.unit.newStatus({
                name: 'ardor',
                duration: this.duration,
                desc: 'pierce rating is increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.pierce -= this.added
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'ardor',
            duration: this.duration,
            desc: 'pierce rating is increased',
        })
    }
}
