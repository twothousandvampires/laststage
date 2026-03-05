import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'
import ArdorStatus from '../Status/ArdorStatus'

export default class ArdorTrigger implements ITrigger {

    cd: number = 1000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'ardor'
    description: string = 'Increase pierce by half of your armor for 5 seconds'
    count: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        this.count ++

        if(this.count >= 3){
            let s = new ArdorStatus(player.getTime())
            s.setDuration(5000)

            player.level.setStatus(player, s, true)
            this.count = 0
        }
    }
}