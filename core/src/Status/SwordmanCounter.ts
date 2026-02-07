import Character from '../Objects/src/Character'
import Status from './Status'

export default class SwordmanCounter extends Status {
    name: string

    constructor(public time: number) {
        super(time)
        this.name = 'countered attack'
        this.need_to_check_resist = false
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()
            this.unit.critical += 20
            this.unit.pierce += 20
            this.unit.newStatus({
                name: 'counterattack',
                duration: this.duration,
                desc: 'additional critical chance and pierce',
            })
        }
    }

    clear() {
        this.unit.critical -= 20
        this.unit.pierce -= 20
    }

   
    update(status: any) {
        this.time = Date.now()

        this.unit.newStatus({
            name: 'counterattack',
            duration: this.duration,
            desc: 'additional critical chance and pierce',
        })
    }
}