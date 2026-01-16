import UpgradeManager from '../../Classes/UpgradeManager'
import Func from '../../Func'
import Level from '../../Level'
import Effect from './Effects'

export default class Forger extends Effect {

     entered: any[]  = []

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

                if(!this.entered.includes(elem.id)){
                    this.entered.push(elem.id)
                }
                
            } else if (!is_coll && this.entered.includes(elem.id)) {
                elem.left_forger = false
               
                UpgradeManager.closeForgings(elem)
                UpgradeManager.closeSuggest(elem)

                this.entered = this.entered.filter(elem2 => elem2 != elem.id)
            }
        })
    }
}
