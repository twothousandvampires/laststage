import Builder from '../../../Classes/Builder'
import Func from '../../../Func'
import Level from '../../../Level'
import Manifistation from './Manifistation'

export class MasteryManifistation extends Manifistation {
    constructor(level: Level) {
        super(level)
        this.name = 'mastery manifistation'
        this.count_to_activate = 8
    }

    activate(): void {}

    async giveReward() {
        if (this.stage === 0) return
        if (!this.activated_by) return

        let chance = 0

        if (this.stage == 1) {
            chance = 10
        }
        else if (this.stage == 2) {
            chance = 20
        }
        else if (this.stage == 3) {
            chance = 30
        }
        else if (this.stage == 4) {
            chance = 50
        }
        else if (this.stage >= 5) {
            chance = 100
        }

        if(Func.chance(chance)){
            let mastery = Builder.createRandomMastery()
            this.activated_by.masteries.push(mastery)
            await Func.sleep(2000)
            this.activated_by.level.addMessedge(mastery.name + ' was added')
        }
        else{
            this.activated_by.level.addMessedge('your skill is not enough...')
        }
    }
}
