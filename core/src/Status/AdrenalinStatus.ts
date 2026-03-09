import Character from '../Objects/src/Character'
import Status from './Status'

export default class AdrenalinStatus extends Status {
    name: string

    constructor(public time: number) {
        super(time)
        this.name = 'adrenalin'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.armour_rate += 15
            this.unit.pierce += 15

            this.unit.newStatus({
                name: 'adrenalin',
                duration: this.duration,
                desc: 'armour and pierce rating are increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.armour_rate -= 15
            this.unit.pierce -= 15
        }
    }

    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'adrenalin',
            duration: this.duration,
            desc: 'armour and pierce rating are increased',
        })
    }
}