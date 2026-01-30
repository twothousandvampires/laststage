import Character from '../Objects/src/Character'
import Status from './Status'

export default class TurtleShellStatus extends Status {
    constructor(public time: number) {
        super(time)
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.armour_rate += 30
            this.unit.fortify += 30
            this.unit.statusWasApplied()

            this.unit.newStatus({
                name: 'turtle shell',
                duration: this.duration,
                desc: 'armour and fortification are increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.armour_rate -= 30
            this.unit.fortify -= 30
        }
    }

    update(status: any): void {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'turtle shell',
            duration: this.duration,
            desc: 'armour and fortification are increased',
        })
    }
}
