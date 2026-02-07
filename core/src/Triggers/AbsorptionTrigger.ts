import ITrigger from '../Interfaces/Itrigger'
import { SoulShatterProj } from '../Objects/Projectiles/SoulShatterProj'
import Character from '../Objects/src/Character'

export default class AbsorptionTrigger implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'absorption'
    description: string = 'Soul shards are released from enemies, and the number of them depends on your courage'
    chance: number = 100

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(target) return

        let count = player.getSecondResource()

        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let angle = Math.random() * (max_a - min_a) + min_a
            let proj = new SoulShatterProj(player.level)
            proj.setStart(player.level.time)
            proj.setAngle(angle)
            proj.setPoint(target.x, target.y)
            proj.setOwner(player)

            player.level.projectiles.push(proj)
        }
    }
}
