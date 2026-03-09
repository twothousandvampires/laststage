import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import AdrenalinStatus from '../Status/AdrenalinStatus'

export default class Adrenalin implements ITrigger {

    cd: number = 2000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'adrenalin'
    description: string = 'Increase you armour and pierce rating by 15 for 5 seconds'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        let s = new AdrenalinStatus(player.getTime())
        s.setDuration(5000)

        player.level.setStatus(player, s, true)
        
    }
}