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

        if (this.stage == 1) {
            this.activated_by.first_ability.mastery_chance += 1
            this.activated_by.level.addMessedge('mastery chance was increased on first ability')
        }
        else if (this.stage == 2) {
            this.activated_by.first_ability.mastery_chance += 1
            this.activated_by.second_ability.mastery_chance += 1
            await Func.sleep(2000)
            this.activated_by.level.addMessedge('mastery chance were increased on first and second ability')
        }
        else if (this.stage == 3) {
            this.activated_by.first_ability.mastery_chance += 1
            this.activated_by.second_ability.mastery_chance += 1
            this.activated_by.third_ability.mastery_chance += 1
            await Func.sleep(2000)
            this.activated_by.level.addMessedge('mastery chance were increased on first and second and third ability')
        }
        else if (this.stage == 4) {
            this.activated_by.first_ability.mastery_chance += 1
            this.activated_by.second_ability.mastery_chance += 1
            this.activated_by.third_ability.mastery_chance += 1
            this.activated_by.utility.mastery_chance += 1
            await Func.sleep(2000)
            this.activated_by.level.addMessedge('mastery chance were increased on first and second and third ability and utility')
        }
        else if (this.stage >= 5) {
            let mastery = Builder.createRandomMastery()
            this.activated_by.masteries.push(mastery)
            await Func.sleep(2000)
            this.activated_by.level.addMessedge(mastery.name + ' was added')
        }
    }
}
