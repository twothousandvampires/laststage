import Func from '../Func'
import ITrigger from '../Interfaces/ITrigger'
import Character from '../Objects/src/Character'

export default class CrushingWave implements ITrigger {

    cd: number = 5000
    last_trigger_time: number = 0
    chance: number = 100
    name: string = 'crushing wave'
    description: string = 'Apply crushing on nearby enemies'
    times: number = 0

    getTriggerChance(): number {
        return this.chance
    }

    trigger(player: Character, target: any) {
        if(!target) return
        
        let targets = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem, 10) <= 10)

        targets.forEach(elem => {
            elem.crushing ++
        })

        player.level.createEffect(player, 'quake')

        player.playerApplyCrushing(target)
    }
}