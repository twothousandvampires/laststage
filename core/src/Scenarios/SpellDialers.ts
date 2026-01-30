import Level from '../Level'
import Bonfire from '../Objects/Effects/Bonfire'
import SmallTextLanguage1 from '../Objects/Effects/SmallTextLanguage1'
import SmallTextLanguage2 from '../Objects/Effects/SmallTextLanguage2'
import Bones from '../Objects/src/Enemy/Bones'
import Cultist from '../Objects/src/PlayerClasses/Cultist'
import Scenario from './Scenario'

export default class SpellDialers extends Scenario {
    dealer1: any
    dealer2: any
    dealer3: any
    bayer: any
    constructor() {
        super()
        this.map = [
            {
                time: 1000,
                action: (level: Level) => {
                    this.bayer.target = this.dealer2
                },
            },
            {
                time: 4000,
                action: (level: Level) => {
                    let t = new SmallTextLanguage1(level)
                    t.setPoint(this.dealer1.x, this.dealer1.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
            {
                time: 6500,
                action: (level: Level) => {
                    let t = new SmallTextLanguage1(level)
                    t.setPoint(this.dealer2.x, this.dealer2.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
            {
                time: 17000,
                action: (level: Level) => {
                    let t = new SmallTextLanguage1(level)
                    t.setPoint(this.dealer1.x, this.dealer1.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
            {
                time: 18500,
                action: (level: Level) => {
                    let t = new SmallTextLanguage2(level)
                    t.setPoint(this.bayer.x, this.bayer.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
            {
                time: 21000,
                action: (level: Level) => {
                    this.dealer1.using_ability = this.dealer1.utility
                    this.dealer1.utility.use(this.dealer1)
                    this.dealer1.flipped = true
                },
            },
            {
                time: 23000,
                action: (level: Level) => {
                    let t = new SmallTextLanguage2(level)
                    t.setPoint(this.bayer.x, this.bayer.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
            {
                time: 23500,
                action: (level: Level) => {
                    this.dealer1.using_ability = this.dealer1.utility
                    this.dealer1.utility.use(this.dealer1)
                    this.dealer1.flipped = true
                },
            },
            {
                time: 25000,
                action: (level: Level) => {
                    let t = new SmallTextLanguage2(level)
                    t.setPoint(this.bayer.x, this.bayer.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
             {
                time: 27000,
                action: (level: Level) => {
                    this.dealer1.using_ability = this.dealer1.utility
                    this.dealer1.utility.use(this.dealer1)
                     this.dealer1.flipped = true
                },
            },
            {
                time: 29300,
                action: (level: Level) => {
                    let t = new SmallTextLanguage2(level)
                    t.setPoint(this.bayer.x, this.bayer.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },                          
            {
                time: 34000,
                action: (level: Level) => {
                    this.bayer.target = this.dealer3
                },
            },
            {
                time: 38000,
                action: (level: Level) => {
                    let t = new SmallTextLanguage1(level)
                    t.setPoint(this.dealer2.x, this.dealer2.y)
                    t.z = 13

                    level.effects.push(t)
                },
            },
        ]
    }

    checkTime(level: Level) {
        let time_elapsed = level.time - level.started

        let next_action = this.map[0]

        if (next_action && next_action.time <= time_elapsed) {
            next_action.action(level)
            this.map.shift()
        }
    }

    start(level: Level): void {
        let p = level.players[0]

        p.x = 100
        p.y = 28
        p.light_r = 10
        p.cast_speed = 1200
        this.dealer1 = p
        let wizard = new Cultist(level)
        wizard.x = 107
        wizard.y = 30
        wizard.flipped = true

        level.players.push(wizard)
        this.dealer2 = wizard

        let bayer = new Bones(level)
        bayer.phasing = true
        bayer.player_check_radius = 2000
        bayer.enemyCanAtack = () => { return false }
        bayer.setPoint(60, 60)

        this.bayer = bayer
        level.enemies.push(this.bayer)

        let torch = new Bonfire(level)
        torch.light_r = 12
        torch.setPoint(96, 32)
        level.binded_effects.push(torch)

        let d3 = new Cultist(level)

        d3.setPoint(60, 60)
        this.dealer3 = d3
        level.players.push(d3)
    }
}
