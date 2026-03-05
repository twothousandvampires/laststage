import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import TimeDistortion from '../Status/TimeDistortion'

export default class MatterDistortionTrigger implements ITrigger {
    cd: number = 10000
    last_trigger_time: number = 0
    count: number = 0
    name: string = 'matter distortion'
    description: string = 'When any of your triggers are activated, matter around you is distorted, applying various effects to you or your enemies'
    chance: number = 100

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character) {
        player.level.enemies.forEach(elem => {
            if(!elem.is_dead && Func.distance(player, elem) <= 14){
                let r = Func.random(1, 3)
                if(r === 1){
                    elem.move_speed_penalty -= 200
                }
                else if(r === 2){
                    elem.takeDamage(player, {
                        instant_death: true
                    })
                }
                else if(r === 3){
                    elem.removeTarget(20000)
                }
            }
        })

        if(Func.chance(15)){
            let s = new TimeDistortion(player.level.time)
            s.setDuration(5000)

            player.level.setStatus(player, s, true)
        }
    }
}
