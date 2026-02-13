import SoulSeekers from '../../../EnemyAbilities/SoulSeekers'
import SoulVortex from '../../../EnemyAbilities/SoulVortex'
import Func from '../../../Func'
import Level from '../../../Level'
import EnemyMelleDashState from '../../../State/EnemyMelleDashState'
import Undead from './Undead'

export default class Specter extends Undead {
    ressurect_chance: number
    want_to_cast: boolean
    spell_name: string | undefined
    can_cast_vortex: boolean
    can_cast_seekers: boolean

    constructor(level: Level) {
        super(level)
        this.name = 'specter'
        this.box_r = 2.5
        this.move_speed = 0.05
        this.cooldown_attack = 2000
        this.attack_radius = 7.2
        this.attack_speed = 2000
        this.life_status = 4
        this.spawn_time = 1600
        this.ressurect_chance = 30
        this.armour_rate = 50
        this.want_to_cast = true
        this.can_cast_vortex = true
        this.can_cast_seekers = true
        this.create_grace_chance = 90
        this.create_chance = 90
        this.gold_revard = 5
        this.create_item_chance = 6
        this.pierce = 20
        this.big_grace_chance = 7

        this.dash_ms = 0.4
        this.abilities = [new SoulVortex(), new SoulSeekers()]
    }

    getAttackState() {
        return new EnemyMelleDashState()
    }

    deadSound(): void {
        if (Func.notChance(15)) return

        this.level.sounds.push({
            x: this.x,
            y: this.y,
            name: 'specter dead',
        })
    }

    getHitSound(){
        this.level.sounds.push({
            x: this.x,
            y: this.y,
            name: 'specter attack',
        })
    }

    getCastStateString() {
        return 'cast'
    }
}
