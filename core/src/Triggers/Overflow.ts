import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import HitSpark from '../Objects/Effects/HitSpark'
import Character from '../Objects/src/Character'

export default class Overflow implements ITrigger {
    cd: number = 0
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'overflow'
    description: string = 'There is a chance to create electric explosion around you'
    chance: number = 20

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, value: number = 0) {
        if(!value) return

        let count = player.resource

        let zones = 6.28 / count
        let sound = false
        
        for (let i = 1; i <= count; i++) {
            let min_a = (i - 1) * zones
            let max_a = i * zones
            let angle = Math.random() * (max_a - min_a) + min_a

            let x = Func.random(5, 12)
            let y = Func.random(5, 12)
            
            let box = {
                x: player.x + Math.sin(angle) * x,
                y: player.y + Math.cos(angle) * y,
                r: 5
            }

            player.level.enemies.forEach(e => {
                if (!e.is_dead && Func.elipseCollision(box, e.getBoxElipse())) {
                    e.takeDamage(player)
                    if(!sound) {
                        player.level.addSound('zap', e.x, e.y)
                        sound = true
                    }
                }
            })
            
            let proj = new HitSpark(player.level)
            proj.setPoint(box.x, box.y)

            player.level.addEffect(proj)
        }
    }
}