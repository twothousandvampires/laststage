import Character from '../Objects/src/Character'
import Status from './Status'

export default class BattleOrdersStatus extends Status {
    constructor(public time: number) {
        super(time)
        this.name = 'battle orders'
    }

    apply(unit: any) {
        this.unit = unit

        if (this.unit instanceof Character) {
            this.unit.armour_rate += this.power
            this.unit.pierce += this.power
            this.unit.statusWasApplied()

            this.unit.newStatus({
                name: 'battle orders',
                duration: this.duration,
                desc: 'armour and pierce are increased',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.armour_rate -= this.power
            this.unit.pierce -= this.power
        }
    }
}