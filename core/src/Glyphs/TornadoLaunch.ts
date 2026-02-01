import Ability from '../Abilities/Ability'
import Func from '../Func'
import Tornado from '../Objects/Projectiles/Tornado'
import Character from '../Objects/src/Character'
import Mastery from './Mastery'

export default class TornadoLaunch extends Mastery {
    constructor() {
        super()
        this.name = 'tornado launch'
        this.description = 'When you start an ability there is a chance to release a tornado.'
    }

    trigger(player: Character, ability: Ability) {
        let e = new Tornado(player.level)
        e.setPoint(player.x, player.y)
        e.setOwner(player)

        player.level.projectiles.push(e)
    }
}
