import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import { MagicShard } from '../Objects/Projectiles/MagicShard'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class FlyerParryTrigger implements ITrigger {
    cd: number = 400
    last_trigger_time: number = 0
    name: string = 'magic wave'
    description: string = 'deals damage around you'

    constructor(public chance: number = 100) {

    }

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        if(!target) return

        let proj = new MagicShard(player.level)
        proj.setPoint(player.x, player.y)
        proj.setAngle(Func.angle(player.x, player.y, target.x, target.y))
        proj.setOwner(player)

        player.level.projectiles.push(proj)
    }
}