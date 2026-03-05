import ITrigger from '../Interfaces/ITrigger'
import { TurnOffIronProjectile } from '../Objects/Projectiles/TurnOffIronProjectile'
import Character from '../Objects/src/Character'

export default class TurnOffIronTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'torn off iron'
    description: string = 'There is a chance to create piece of iron shard that spins around you'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        console.log('triggered')
        let e = new TurnOffIronProjectile(player.level)
        e.setAngle(Math.random() * 6.28)
        e.setOwner(player)

        player.level.projectiles.push(e)
    }
}