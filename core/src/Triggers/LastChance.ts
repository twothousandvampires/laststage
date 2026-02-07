import Func from '../Func'
import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'

export default class LastChance implements ITrigger {
    cd: number = 12000
    last_trigger_time: number = 0
    chance: number = 0
    name: string = 'last chance'
    description: string = 'You get courage equals count of nearby enemies'

    getTriggerChance(player: Character | undefined): number {
        return 100
    }

    trigger(player: Character) {
        let c = player.level.enemies.filter(elem => !elem.is_dead && Func.distance(player, elem) <= 12).length

        player.addCourage(c)
    }
}