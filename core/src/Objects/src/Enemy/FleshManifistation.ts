import Func from '../../../Func'
import Level from '../../../Level'
import Corrosion from '../../../Status/Corrosion'
import Cowardice from '../../../Status/Cowardice'
import Curse2 from '../../../Status/Curse2'
import Exhaustion from '../../../Status/Exhaustion'
import Fragility from '../../../Status/Fragility'
import Weakness from '../../../Status/Weakness'
import Manifistation from './Manifistation'

export class FleshManifistation extends Manifistation {
    constructor(level: Level) {
        super(level)
        this.name = 'flesh manifistation'
    }

    activate(): void {
        let pull = [
            new Fragility(this.level.time),
            new Curse2(this.level.time),
            new Exhaustion(this.level.time),
            new Cowardice(this.level.time),
            new Weakness(this.level.time),
            new Corrosion(this.level.time),
        ]

        for (let i = -1; i < this.stage; i++) {
            let s = Func.getRandomFromArray(pull)
            s.setDuration(5000 + this.stage * 1500)

            this.level.setStatus(this.activated_by, s)
            pull = pull.filter(elem => elem != s)
        }
    }

    giveReward() {
        if (this.stage === 0) return
        if (!this.activated_by) return

        this.activated_by.changeStats(this.stage)

        this.level.addMessedge('main stats were increased', this.activated_by.id)   
    }
}
