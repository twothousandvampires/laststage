import UnitSprite from "../UnitSprite"

export default class Binded extends UnitSprite{

   
    constructor(id: string){
      super(id)
      this.real_x = 10
      this.real_y = 14
      this.sprite_h = 100
      this.sprite_w = 100
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'binded'

        if(this.state === 'spawn'){   
            this.y_frame_offset = 200
            this.max_frame = 6
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 8
            this.max_frame_tick =7
        }
        else if(this.state === 'move'){
            this.y_frame_offset = 0
            this.max_frame = 8
            this.max_frame_tick =7
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 300
            this.max_frame = 7
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }
        else if(this.state === 'dead'){
            this.max_frame = 6
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.removable = true
        }
        else if(this.state === 'explode'){
            this.y_frame_offset = 300
            this.max_frame = 7
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }
        else if(this.state === 'zaped'){
            this.y_frame_offset = 300
            this.max_frame = 7
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }

        else if(this.state === 'attack'){
            this.y_frame_offset = 100
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }
        else if(this.state === 'stunned'){
            this.y_frame_offset = 300
            this.max_frame = 7
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
        }
        else if(this.state === 'freezed'){
            this.y_frame_offset = 500
            this.max_frame = 1
            this.max_frame_tick = 10000
        }
        else if(this.state === 'freeze_dying'){
            this.removable = true
            this.y_frame_offset = 600
            this.max_frame = 9
            this.max_frame_tick = 2
        }
        else{
            this.removable = true
        }
    }
}