import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import { Lightning } from '../Objects/Projectiles/Lightning'
import Character from '../Objects/src/Character'

export default class ChargedShield implements ITrigger {

    cd: number = 500
    last_trigger_time: number = 0
    chance: number = 75
    name: string = 'charged shield'
    description: string = 'There is a chance to create lightning when you block'

    getTriggerChance(player: Character): number {
        return this.chance
    }

    trigger(player: Character) {
        let target = player.level.enemies[Math.floor(Math.random() * player.level.enemies.length)]

        if (target) {
            let proj = new Lightning(player.level)
            proj.setOwner(player)
            proj.setAngle(Func.angle(player.x, player.y, target.x, target.y))
            proj.setPoint(player.x, player.y)

            player.level.projectiles.push(proj)
        }
    }
}