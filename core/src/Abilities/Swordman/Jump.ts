import Func from '../../Func'
import IUnitState from '../../Interfaces/IUnitState'
import ChargedSphere from '../../Objects/Effects/ChargedSphere'
import Effect from '../../Objects/Effects/Effects'
import GraceShard from '../../Objects/Effects/GraceShard'
import Helm from '../../Objects/Effects/Helm'
import ItemDrop from '../../Objects/Effects/ItemDrop'
import RocksFromCeil from '../../Objects/Effects/RocksFromCeil'
import SorcerersSkull from '../../Objects/Effects/SorcerersSkull'
import Split from '../../Objects/Effects/Split'
import Character from '../../Objects/src/Character'
import Swordman from '../../Objects/src/PlayerClasses/Swordman'
import Ability from '../Ability'
import SwordmanAbility from './SwordmanAbility'

export default class Jump extends SwordmanAbility implements IUnitState<Swordman> {
    start = 0
    total_jump_time: number //ms
    impact: boolean
    cost: number
    distance: number | undefined
    move_per_tick: number | undefined
    heavy_landing: boolean
    stomp: boolean
    tremor: boolean = false
    shake: boolean = false
    z_add = 0.7

    constructor(owner: Swordman) {
        super(owner)
        this.total_jump_time = 1200
        this.impact = false
        this.cost = 4
        this.cd = 6500
        this.heavy_landing = false
        this.stomp = false
        this.name = 'jump'
        this.type = Ability.TYPE_CUSTOM
        this.mastery_chance = 35
    }

    enter(player: Character) {
        player.prepareToAction()

        this.distance = Math.sqrt((player.x - player.c_x) ** 2 + (player.y - player.c_y) ** 2)

        if (this.distance > 25) this.distance = 25
        if (this.distance < 10) this.distance = 10

        this.move_per_tick = this.distance / Math.floor(this.total_jump_time / 30)

        this.owner.state = 'jump'
        this.owner.can_be_controlled_by_player = false
        player.chance_to_avoid_damage_state += 100

        this.start = player.level.time
    }

    exit(player: Character) {
        player.z = 0
        player.chance_to_avoid_damage_state -= 100

        this.start = 0
        this.impact = false
        this.owner.can_be_controlled_by_player = true
        this.z_add = 0.7
    }

    update(player: Character) {
        if (this.impact) {
            this.afterUse()

            let second = player.getSecondResource()
            let enemies = player.level.enemies

            if(this.tremor){
                let count = 2 + Math.round(second / 5)
                
                let zones = 6.28 / count
        
                for (let i = 1; i <= count; i++) {
                   
                    let min_a = (i - 1) * zones
                    let max_a = i * zones
        
                    let angle = Math.random() * (max_a - min_a) + min_a
                    let distance_x = player.attack_radius + (this.stomp ? 5 : 0) + Math.round(second / 4)
                    let distance_y = player.attack_radius + (this.stomp ? 5 : 0) + Math.round(second / 4)
                    let effect = new RocksFromCeil(player.level)
        
                    effect.setPoint(
                        player.x + Math.sin(angle) * distance_x,
                        player.y + Math.cos(angle) * distance_y
                    )
        
                    player.level.addEffect(effect)
        
                    setTimeout(() => {
                        let box = effect.getBoxElipse()
                        box.r = 6
        
                        player.level.enemies.forEach(elem => {
                            if (!elem.is_dead && Func.elipseCollision(elem.getBoxElipse(), box)) {
                                elem.takeDamage(player, {})
                            }
                        })
                    }, 500)
                }
            }


            let attack_elipse = player.getBoxElipse()
            attack_elipse.r = player.attack_radius + (this.stomp ? 5 : 0) + Math.round(second / 4)

            let filtered_by_attack_radius = enemies.filter(elem =>
                Func.elipseCollision(attack_elipse, elem.getBoxElipse())
            )
            let count = filtered_by_attack_radius.length

            filtered_by_attack_radius.forEach(elem => {
                player.addPoint()
                elem.takeDamage(player)
            })

            filtered_by_attack_radius = player.level.players.filter(
                elem => elem != player && Func.elipseCollision(attack_elipse, elem.getBoxElipse())
            )

            filtered_by_attack_radius.forEach(elem => {
                player.addPoint()
                elem.takeDamage(player)
            })

            if (this.heavy_landing) {
                player.armour_rate += count * 4
                setTimeout(() => {
                    player.armour_rate -= count * 4
                }, 5000)
            }

            if(this.shake){
                player.level.enemies.forEach(corpse => {
                    if (corpse.is_corpse && Func.chance(15) && Func.elipseCollision(corpse.getBoxElipse(), attack_elipse)) {       
                        let drop_name: Effect | undefined | string = undefined
            
                        let total_weights = [
                            ['grace', 20],
                            ['energy', 5],
                            ['entity', 5],
                            ['item', 1],
                            ['skull', 1],
                            ['helm', 1],
                        ]
            
                        let sum = total_weights.reduce((acc, elem) => elem[1] + acc, 0)
                        let w2 = 0
                        let rnd = Math.random() * sum
                        for (let item of total_weights) {
                            w2 += item[1]
                            if (rnd <= w2) {
                                drop_name = item[0]
                                break
                            }
                        }
            
                        if (drop_name === 'grace') {
                            drop_name = new GraceShard(corpse.level)
                        } else if (drop_name === 'energy') {
                            drop_name = new ChargedSphere(corpse.level)
                        } else if (drop_name === 'entity') {
                            drop_name = new Split(corpse.level)
                        } else if (drop_name === 'item') {
                            drop_name = new ItemDrop(corpse.level)
                        } else if (drop_name === 'skull') {
                            drop_name = new SorcerersSkull(corpse.level)
                        } else if (drop_name === 'helm') {
                            drop_name = new Helm(corpse.level)
                        }
            
                        if (drop_name instanceof Effect) {
                            let a = Math.random() * 6.28
                            drop_name.setPoint(corpse.x + Math.sin(a) * 6, corpse.y + Math.cos(a) * 6)
                            player?.level.binded_effects.push(drop_name)
                        }
                    }                   
                })
            }

            player.getState()
            return
        } else {
            let delta = player.level.time - this.start
            if (delta >= this.total_jump_time) {
                this.impact = true
                return
            }
            if (delta >= this.total_jump_time / 2) {
                player.z -= this.z_add
                this.z_add += 0.02
            } else {
                player.z += this.z_add
                this.z_add -= 0.02
            }

            if (this.z_add < 0) this.z_add = 0

            let next_step_x = Math.sin(player.attack_angle) * this.move_per_tick
            let next_step_y = Math.cos(player.attack_angle) * this.move_per_tick

            if (!player.isOutOfMap(player.x + next_step_x, player.y + next_step_y)) {
                player.addToPoint(next_step_x, next_step_y)
            }
        }
    }
}
