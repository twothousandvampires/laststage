import Func from "../../Func";
import Level from "../../Level";
import Effect from "../Effects/Effects";
import HitSpark from "../Effects/HitSpark";
import Character from "../src/Character";

export default class ChainManager extends Effect{

    stage: number = 0
    start: number = 0
    hited: any[] = []
    max_stages: number = 0
    last_target: any

    constructor(level: Level, private player: Character){
        super(level)
        this.max_stages = 5
        this.last_target = player
    }

    act(time: number){
        if(this.stage >= this.max_stages){
            this.delete()
            return
        }
        else if(time - this.start >= 300){
            let t = this.level.enemies.filter(elem => !elem.is_dead && !this.hited.includes(elem.id) && Func.distance(elem, this.last_target, 20) <= 20)[0]

            if(t){
                t.takeDamage(this.player, {
                    burn: true
                })
                this.hited.push(t.id)
                
                let ticks = Math.round((Func.distance(t, this.last_target)) / 5)
                let a = Func.angle(this.last_target.x, this.last_target.y, t.x, t.y)
                let next_step_x = Math.sin(a)
                let next_step_y = Math.cos(a)
                
                for(let i = 0; i < ticks; i++){            
                    let e = new HitSpark(this.level)
                    e.setPoint(this.last_target.x + next_step_x * (i * ticks), this.last_target.y + next_step_y * (i * ticks))
                    this.player.level.addEffect(e)
                }

                this.last_target = t
            }
            
            this.stage ++
        }         
    }
}