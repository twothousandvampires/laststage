import UpgradeManager from '../../Classes/UpgradeManager'
import Func from '../../Func'
import Level from '../../Level'
import Effect from './Effects'

export default class Forger extends Effect {

    constructor(level: Level) {
        super(level)
        this.name = 'forger'

        this.box_r = 1.8
        this.zone_id = 1
        this.x = 165
        this.y = 50
    }

    act(time: number) {
        this.level.players.forEach(elem => {
            let is_coll = Func.elipseCollision(elem.getBoxElipse(), this.getBoxElipse())
            if (!elem.left_forger && is_coll) {
                UpgradeManager.showForgings(elem)
            } else if (!is_coll) {
                elem.left_forger = false
                UpgradeManager.closeForgings(elem)
                UpgradeManager.closeSuggest(elem)
            }
        })
    }
}
