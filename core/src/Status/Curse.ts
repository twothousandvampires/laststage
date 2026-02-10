import Character from '../Objects/src/Character'
import Status from './Status'

export default class Curse extends Status {
    constructor(public time: number) {
        super(time)
        this.name = 'imbecility'
        this.need_to_check_resist = true
    }

    apply(unit: any) {
        this.unit = unit
         console.log('11hereeee22')
        if (this.unit instanceof Character) {
            this.unit.can_use_skills = false
            this.unit.statusWasApplied()

            this.unit.newStatus({
                name: 'imbecility',
                duration: this.duration,
                desc: 'cannot use abilities',
            })
        }
    }

    clear() {
         console.log('hereeee22')
        if (this.unit instanceof Character) {
            console.log('hereeee')
            this.unit.can_use_skills = true
        }
    }
}
