import Func from '../../Func'
import Level from '../../Level'
import Projectiles from './Projectiles'

export default class ChallangeGold extends Projectiles {
    w: number = 2
    constructor(level: Level, hit: boolean = false, private challenge: any) {
        super(level)
        this.box_r = 0.8
        this.name = 'flying gold'
        this.move_speed = 0.65
    }

    impact() {
        this.challenge.missed ++
        this.level.deleted.push(this.id)
        this.level.projectiles = this.level.projectiles.filter(elem => elem != this)
    }

    act(time: number): void {
        for (let i = 0; i < this.level.players.length; i++) {
            let e = this.level.players[i]

            if (!e.is_dead && Func.elipseCollision(this.getBoxElipse(), e.getBoxElipse())) {
                e.addGoldValue(1)
                this.impact()
                return
            }
        }

        this.moveAct()
    }
}