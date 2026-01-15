import UnitSprite from "../UnitSprite"

export default class ExplodingSkull extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 2
      this.real_y = 2
      this.sprite_h = 50
      this.sprite_w = 50
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'demonskull'

        if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 5
            this.max_frame_tick = 6
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 50
            this.max_frame = 6
            this.max_frame_tick = 3
            this.repeatable = false
            this.removable = true     
        }
        else if(this.state === 'cast'){
            this.y_frame_offset = 100
            this.max_frame = 6
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false    
        }
        else{
            this.removable = true
        }
    }
}