import Character from '../Objects/src/Character'
import Status from './Status'

export default class SwordmanCounter extends Status {
    name: string

    constructor(public time: number) {
        super(time)
        this.name = 'countered attack'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.chance_to_instant_kill += 40

            this.unit.newStatus({
                name: 'counterattack',
                duration: this.duration,
                desc: 'additional chance to instan kill',
            })
        }
    }

    clear() {
        this.unit.chance_to_instant_kill -= 40
    }

   
    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'counterattack',
            duration: this.duration,
            desc: 'additional chance to instan kill',
        })
    }
}