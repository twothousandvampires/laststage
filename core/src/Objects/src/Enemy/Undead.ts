import Func from '../../../Func'
import Level from '../../../Level'
import UndeadDeadState from '../../../State/UndeadDeadState'
import BonesHit from '../../Effects/BonesHit'
import FloorBones from '../../Effects/FloorBones'
import SmallTextLanguage3 from '../../Effects/SmallTextLanguage3'
import Enemy from './Enemy'

export default class Undead extends Enemy {
    ressurect_chance: number = 0

    constructor(level: Level) {
        super(level)
        this.name = 'undead'
    }

    takeDamage(unit: any = undefined, options: any = {}) {
        super.takeDamage(unit, options)

        if (this.life_status <= 0 && unit?.blessed) {
            this.ressurect_chance = Math.round(this.ressurect_chance / 2)
        }
    }

    createHitEffect(){
        let e = new BonesHit(this.level)
        e.setPoint(Func.random(this.x - 2, this.x + 2), this.y)
        e.z = Func.random(2, 8)
        this.level.effects.push(e)

        let fe = new FloorBones(this.level)
        fe.setPoint(Func.random(this.x - 4, this.x + 4), Func.random(this.y - 4, this.y + 4))
        this.level.effects.push(fe)
    }

    getDeadStateInstance() {
        return new UndeadDeadState()
    }

    getWeaponHitedSound() {
        return {
            name: 'hit bones',
            x: this.x,
            y: this.y,
        }
    }

    getExplodedSound() {
        return {
            name: 'bones explode',
            x: this.x,
            y: this.y,
        }
    }

    public sayPhrase(): void {
        if (!Func.chance(1)) return

        let phrase = new SmallTextLanguage3(this.level)
        phrase.z = this.say_z
        phrase.setPoint(this.x, this.y)

        this.level.effects.push(phrase)
    }
}
