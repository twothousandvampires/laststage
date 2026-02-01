import ITrigger from '../Interfaces/Itrigger'
import Character from '../Objects/src/Character'
import SerchingHeartStatus from '../Status/SerchingHeartStatus'
import Item from './Item'

export default class SearchingHeart extends Item implements ITrigger {

    cd: number = 100
    hit_count: number = 0
    last_trigger_time: number = 0
    chance: number = 100

    constructor() {
        super()
        this.name = 'searching heart'
        this.type = 3
        this.description = 'Every 10 seconds releases fireballs; the number depends on health lost during that time'
    }

    getTriggerChance(player: Character | undefined): number {
        return this.chance
    }

    getSpecialForgings() {
        return ['count']
    }

    equip(character: Character): void {
        character.triggers_on_lose_life.push(this)

        let s = new SerchingHeartStatus(character.level.time, this)
        character.level.setStatus(character, s)
    }

    trigger(character: Character) {
        if (this.disabled) return

        this.hit_count ++
    }
}
