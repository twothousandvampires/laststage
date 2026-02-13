import ITrigger from '../Interfaces/Itrigger'
import MoltenShrapnelProjectile from '../Objects/Projectiles/MoltenShrapnelProjectile'
import Character from '../Objects/src/Character'
import Unit from '../Objects/src/Unit'

export default class MoltenShrapenel implements ITrigger {
    cd: number = 2000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'molten shrapnel'
    description: string = 'Release molten shrapnel in a circle to ignite enemies'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: Unit) {
        let count = 10
        
        let zones = 6.28 / count

        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones

            let angle = Math.random() * (max_a - min_a) + min_a
            let proj = new MoltenShrapnelProjectile(player.level)
            proj.setAngle(angle)
            proj.setPoint(player.x, player.y)

            player.level.projectiles.push(proj)
        }
    }
}
