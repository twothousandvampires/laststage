import UpgradeManager from '../../Classes/UpgradeManager'
import Func from '../../Func'
import Level from '../../Level'
import Effect from './Effects'

export default class Teacher extends Effect {
    
    entered: any[]  = []

    constructor(level: Level) {
        super(level)
        this.name = 'teacher'

        this.box_r = 1.8
        this.zone_id = 1
        this.x = 180
        this.y = 40
    }

    act(time: number) {
        this.level.players.forEach(elem => {
            let is_coll = Func.elipseCollision(elem.getBoxElipse(), this.getBoxElipse())
            if (!elem.left_teacher && !elem.is_dead && is_coll) {
                elem.generateUpgrades()
                UpgradeManager.showUpgrades(elem)
                if(!this.entered.includes(elem.id)){
                    this.entered.push(elem.id)
                }
                
            } else if (!is_coll && this.entered.includes(elem.id)) {
                 this.entered = this.entered.filter(elem2 => elem2 != elem.id)
                elem.left_teacher = false
                UpgradeManager.closeUpgrades(elem)

               
                 console.log(this.entered)
            }
        })
    }
}
