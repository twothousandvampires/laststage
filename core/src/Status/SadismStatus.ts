import Character from '../Objects/src/Character'
import Status from './Status'

export default class SadismStatus extends Status {
    name: string
    power: number = 1

    constructor(public time: number) {
        super(time)
        this.name = 'sadism'
    }

    apply(unit: any) {
        this.unit = unit
        if (this.unit instanceof Character) {
            this.unit.statusWasApplied()

            this.unit.pierce += this.power
            this.unit.move_speed_penalty += this.power

            this.unit.newStatus({
                name: 'sadism',
                duration: this.duration,
                desc: 'pierce and move speed are incresed',
            })
        }
    }

    clear() {
        if (this.unit instanceof Character) {
            this.unit.pierce -= this.power
            this.unit.move_speed_penalty -= this.power
        }
    }

    update(status: any) {
        this.time = Date.now()
        this.power ++
        
        this.unit.pierce += 1
        this.unit.move_speed_penalty += 1

        this.unit.newStatus({
            name: 'sadism',
            duration: this.duration,
            desc: 'pierce and move speed are incresed',
        })
    }
}