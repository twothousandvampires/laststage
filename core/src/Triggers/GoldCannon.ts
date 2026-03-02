import ITrigger from '../Interfaces/Itrigger'
import FlyingGold from '../Objects/Projectiles/FlyingGold'
import Character from '../Objects/src/Character'

export default class GoldCannon implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'gold cannon'
    description: string = 'Fires gold projectiles into enemy'

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, value: number = 1) {
        for (let i = 0; i < value; i++) {

            let l = new FlyingGold(player.level)
            let angle = Math.random() * 6.28

            l.setPoint(player.x + Math.sin(angle) * 3, player.y + Math.cos(angle) * 3)
            l.setAngle(angle)
        
            player.level.projectiles.push(l)
        }
    }
}