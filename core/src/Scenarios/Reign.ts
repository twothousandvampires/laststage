import Func from '../Func'
import Level from '../Level'
import BigFrostNova from '../Objects/Effects/BigFrostNova'
import BigShockNova from '../Objects/Effects/BigShockNova'
import Bonfire from '../Objects/Effects/Bonfire'
import Devour from '../Objects/Effects/Devour'
import FireExplosion from '../Objects/Effects/FireExplosion'
import FireExplosionSmall from '../Objects/Effects/FireExplosionSmall'
import FlamyRing from '../Objects/Effects/FlamyRing'
import FrostExplosionBig from '../Objects/Effects/FrostExplosionBig'
import GoingUpStar from '../Objects/Effects/GoingUpStar'
import Reign2 from '../Objects/Effects/Reign2'
import Reign3 from '../Objects/Effects/Reign3'
import ReignEffect from '../Objects/Effects/ReignEffect'
import SmallTextLanguage1 from '../Objects/Effects/SmallTextLanguage1'
import SmallTextLanguage2 from '../Objects/Effects/SmallTextLanguage2'
import ToothExplode from '../Objects/Effects/ToothExplode'
import Bones from '../Objects/src/Enemy/Bones'
import Impy from '../Objects/src/Enemy/Impy'
import Cultist from '../Objects/src/PlayerClasses/Cultist'
import Flyer from '../Objects/src/PlayerClasses/Flyer'
import Swordman from '../Objects/src/PlayerClasses/Swordman'
import Scenario from './Scenario'

export default class Reign extends Scenario {
    dealer1: any
    dealer2: any
    dealer3: any
    bayer: any
    dialog: any
    reign: any
    stars_interaval: any
    impy_interval: any
    stars:number = 0

    constructor() {
        super()
        this.map = [
            {
                time: 1000,
                action: (level: Level) => {
                    
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

    createImpy(level){
        let impy = new Impy(level)
        impy.target = this.dealer1
        impy.attack_radius = 20

        let a = Math.random() * 6.28
        impy.setPoint(this.dealer1.x + Math.sin(a) * 20, this.dealer1.y + Math.cos(a) * 20)
        level.enemies.push(impy)
    }
    
    createFire(level){
        let e1 = new FireExplosion(level)
        e1.setPoint(this.dealer1.x - 10, this.dealer1.y + 1)
        level.addEffect(e1)

        let e2 = new FireExplosion(level)
        e2.setPoint(this.dealer1.x + 10, this.dealer1.y + 1)
        level.addEffect(e2)
    }

    createFrost(level){
        let e1 = new FrostExplosionBig(level)
        e1.setPoint(this.dealer1.x - 10, this.dealer1.y + 1)
        level.addEffect(e1)

        let e2 = new FrostExplosionBig(level)
        e2.setPoint(this.dealer1.x + 10, this.dealer1.y + 1)
        level.addEffect(e2)
    }

    async createStars(level){
        let count = 30
        let a_per_count = 6.28 / count
        for(let i = 0; i < count; i++){
            await Func.sleep(30)
            let e = new ToothExplode(level)
            let a = i * a_per_count
            let l = 1 - Math.abs(0.5 * Math.cos(a))

            e.setPoint(this.dealer1.x + Math.sin(a) * 20 * l, this.dealer1.y + Math.cos(a) * 20 * l)

            level.addEffect(e)
        }
    }

    async smallLight(){
        for(let i = 0; i < 11; i++){
            await Func.sleep(600)
            this.dealer1.light_r --
        }
    }

    async createStars2(level){
        let count = 30
        let a_per_count = 6.28 / count
        for(let i = 0; i < count; i++){
            await Func.sleep(30)
            let e = new ToothExplode(level)
            let a = 6.28 - (i * a_per_count)
            let l = 1 - Math.abs(0.5 * Math.cos(a))

            e.setPoint(this.dealer1.x + Math.sin(a) * 20 * l, this.dealer1.y + Math.cos(a) * 20 * l)

            level.addEffect(e)
        }
    }

    async createStars3(level){
        let count = 30
        let a_per_count = 6.28 / count

        for(let i = 0; i < count; i+= 2){
            await Func.sleep(30)

            let e = new ToothExplode(level)
            let a = 6.28 - (i * a_per_count)
            let l = 1 - Math.abs(0.5 * Math.cos(a))

            e.setPoint(this.dealer1.x + Math.sin(a) * 20 * l, this.dealer1.y + Math.cos(a) * 20 * l)

            level.addEffect(e)

            //
            let e2 = new ToothExplode(level)
            let a2 = i * a_per_count
            let l2 = 1 - Math.abs(0.5 * Math.cos(a2))

            e2.setPoint(this.dealer1.x + Math.sin(a2) * 20 * l2, this.dealer1.y + Math.cos(a2) * 20 * l2)

            level.addEffect(e2)
        }
    }

    async createSmallExp(level){
        for(let i = 0; i < 40; i++){
            await Func.sleep(Func.random(400, 700))

            let e = new FireExplosionSmall(level)

            let a = Math.random() * 6.28
            let l = 1 - Math.abs(0.5 * Math.cos(a))
            e.setPoint(this.dealer1.x + Math.sin(a) * Func.random(20, 25) * l, this.dealer1.y + Math.cos(a) * Func.random(20, 25) * l)
            level.addEffect(e)
        }
    }
    startSing(level){
        this.dealer1.state = 'sing'
        this.dialog = new SmallTextLanguage1(level)
        this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
        this.dialog.z = 13
        level.binded_effects.push(this.dialog)
    }

    stopSing(){
        this.dealer1.state = 'sing_idle'
        this.dialog.delete()
    }

    async start(level: Level): void {
        let p = level.players[0]
        
        p.x = 60
        p.y = 70

        level.addSound('reign', p.x, p.y)
        p.light_r = 22
        this.dealer1 = p
        p.state = 'sing_idle'

        let wizard = new Cultist(level)
        wizard.x = 70
        wizard.y = 64
        wizard.flipped = true
        level.players.push(wizard)
        this.dealer2 = wizard // d2

        let d3 = new Flyer(level)

        d3.setPoint(50, 64)
        this.dealer3 = d3
        level.players.push(d3)

        this.stars_interaval = setInterval(() => {
            if(this.stars === 0){
                this.createStars(level)
            }
            else if(this.stars === 1){
                this.createStars2(level)
            }
            else if(this.stars === 2){
                this.createStars3(level)
            }
            this.stars++
            if(this.stars > 2){
                this.stars = 0
            }
        }, 4000)

        // this.reign = new ReignEffect(level)
        // this.reign.setPoint(this.dealer1.x, this.dealer1.y)
        // level.binded_effects.push(this.reign)

        // this.dealer1.light_r = 36

        // this.reign.delete()
        // this.reign = new Reign2(level)
        // this.reign.setPoint(this.dealer1.x, this.dealer1.y)
        // level.binded_effects.push(this.reign)

        setTimeout(() => {
            this.dealer2.state = 'guitar'
            level.addSound('reign', p.x, p.y)       
        }, 500)

        setTimeout(() => {
            this.impy_interval = setInterval(() => {
                this.createImpy(level)
            }, 2000)
        }, 10000)

        setTimeout(() => {
            level.createEffect(this.dealer3, 'heaven ray')
        }, 18000)

        setTimeout(() => {
            this.dealer3.state = 'guitar'
        }, 18500)

        setTimeout(() => {
            this.dealer1.state = 'sing'
            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
            level.binded_effects.push(this.dialog)
        }, 34500)


        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 41800)

        setTimeout(() => {
            this.dealer1.state = 'sing'
            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13

            level.binded_effects.push(this.dialog)
        }, 42200)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 48000)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 51000)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 57000)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 59000)

        setTimeout(() => {
            this.createFire(level)
        }, 65500)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 66000)

        setTimeout(async () => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13

            let e = new FlamyRing(level)
            e.setPoint( this.dealer1.x,  this.dealer1.y)
    
            level.addEffect(e)

           
            setTimeout(async () => {
                for (const elem of level.enemies) {
                    await Func.sleep(Func.random(10, 20));
  
                    elem.armour_rate = 0;
                    elem.life_status = 1;
                    elem.takeDamage(this.dealer1, {
                        burn: true
                    });
                }       
            },300)
        }, 66000)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 82000)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.
            z = 13
        }, 90500)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 94500)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 98000)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 103000)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 107000)

         setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 112500)


        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 114500)


        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
            this.createFrost(level)
        }, 121000)


        setTimeout(() => {
            let e = new BigFrostNova(level)
            e.setPoint( this.dealer1.x,  this.dealer1.y)
    
            level.addEffect(e)

            setTimeout(async () => {
                for (const elem of level.enemies) {
                    await Func.sleep(Func.random(10, 20));
  
                    elem.setFreeze(2000)
                    elem.armour_rate = 0
                    elem.life_status = 1
                    elem.takeDamage(this.dealer1, {})
                }       
            },300)
            
        }, 121500)

        setTimeout(() => {
            this.startSing(level)
        }, 122105)

        setTimeout(() => {
            this.stopSing()
        }, 125120)

        setTimeout(() => {
            this.startSing(level)
        }, 126800)

        setTimeout(() => {
            this.stopSing()
        }, 129900)


        setTimeout(() => {
            this.startSing(level)
        }, 131100)

        setTimeout(() => {
            this.stopSing()
        }, 132200)

        setTimeout(() => {
            this.startSing(level)
        }, 133800)

        setTimeout(() => {
            this.stopSing()
        }, 139200)

        setTimeout(() => {
            this.startSing(level)
        }, 142200)

        setTimeout(() => {
            this.stopSing()
        }, 146160)

        setTimeout(() => {
            this.startSing(level)
        }, 147460)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 152000)

        setTimeout(() => {
            this.smallLight()
        }, 155000)


        setTimeout(() => {
            this.createSmallExp(level)
        }, 158200)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 168000)

         setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 171000)

         setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 172000)

         setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 180000)

        setTimeout(async () => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()

            for(let i = 0; i < 11; i++){
            await Func.sleep(90)
                this.dealer1.light_r ++
            }
        }, 182000)

        setTimeout(() => {
            let e = new BigShockNova(level)
            e.setPoint(this.dealer1.x, this.dealer1.y)
            level.addEffect(e)

            clearInterval(this.stars_interaval)
            clearInterval(this.impy_interval)

            this.stars_interaval = setInterval(() => {
                let count = 30
                let a_per_count = 6.28 / count
                for(let i = 0; i < count; i++){
                    let e = new GoingUpStar(level)
                    let a = i * a_per_count
                    let l = 1 - Math.abs(0.5 * Math.cos(a))
                    
                    e.setPoint(this.dealer1.x + Math.sin(a) * 20 * l, this.dealer1.y + Math.cos(a) * 20 * l)

                    level.binded_effects.push(e)
                }
            }, 5500)

            setTimeout(() => {
                level.enemies.forEach(elem => {
                    elem.armour_rate = 1
                    elem.life_status = 1
                    elem.takeDamage(this.dealer1,{                       
                        explode: true
                    })
                })

                this.dealer1.life_status = 1
                this.dealer1.armour_rate = 0
                this.dealer1.takeDamage(undefined, {
                    explode: true,
                    damage_value: 10
                })

                this.dealer2.life_status = 1
                this.dealer2.armour_rate = 0
                this.dealer2.takeDamage(undefined, {
                    explode: true,
                    damage_value: 10
                })

                this.dealer3.life_status = 1
                this.dealer3.armour_rate = 0
                this.dealer3.takeDamage(undefined, {
                    explode: true,
                    damage_value: 10
                })
            }, 300);
        }, 183500)

        setTimeout(() => {
            level.createEffect(this.dealer1, 'soul')
            level.createEffect(this.dealer2, 'soul')
            level.createEffect(this.dealer3, 'soul')
        }, 184300)

        setTimeout(() => {
            this.dealer1.is_dead = false
            this.dealer1.getState()
            this.dealer1.state = 'sing_idle'
            this.dealer1.life_status = 1
            this.dealer1.light_r = 0

            this.dealer2.is_dead = false
            this.dealer2.getState()
            this.dealer2.state = 'guitar'
            this.dealer2.life_status = 1
            this.dealer2.light_r = 2

            this.dealer3.is_dead = false
            this.dealer3.getState()
            this.dealer3.state = 'guitar'
            this.dealer3.life_status = 1
            this.dealer3.light_r = 2
           
            level.enemies = []
        }, 185220)

        setTimeout(() => {
            this.reign = new ReignEffect(level)
            this.reign.setPoint(this.dealer1.x, this.dealer1.y)
            level.binded_effects.push(this.reign)

            this.dealer1.light_r = 38
        }, 186200)

        setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 187400)


        setTimeout(() => {
            this.reign.delete()
            this.reign = new Reign2(level)
            this.reign.setPoint(this.dealer1.x, this.dealer1.y)
            level.binded_effects.push(this.reign)
        }, 188600)
        
        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 223000)

         setTimeout(() => {
            this.dealer1.state = 'sing'

            this.dialog = new SmallTextLanguage1(level)
            this.dialog.setPoint(this.dealer1.x, this.dealer1.y)
            this.dialog.z = 13
        }, 225000)

        setTimeout(() => {
            this.reign.delete()
            this.reign = new Reign3(level)
            this.reign.setPoint(this.dealer1.x, this.dealer1.y)
            level.binded_effects.push(this.reign)
        }, 232000)
        
         setTimeout(() => {
            this.dealer1.invisible = true
            this.dealer2.invisible = true
            this.dealer3.invisible = true
            clearInterval(this.stars_interaval)
            let e1 = new Devour(level)
            e1.setPoint(this.dealer1.x, this.dealer1.y)
            level.addEffect(e1) 

            let e2 = new Devour(level)
            e2.setPoint(this.dealer2.x, this.dealer2.y)
            level.addEffect(e2)

            let e3 = new Devour(level)
            e3.setPoint(this.dealer3.x, this.dealer3.y)
            level.addEffect(e3) 
        }, 233000)

        setTimeout(() => {
            this.dealer1.state = 'sing_idle'
            this.dialog.delete()
        }, 235500)
    }
}
