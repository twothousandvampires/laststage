import UnitSprite from "../UnitSprite"

export default class ConstractedOne extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 6
      this.real_y = 9
      this.sprite_h = 50
      this.sprite_w = 50
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'ancient2'

        if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 12
            this.max_frame_tick = 6
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 50
            this.max_frame = 14
            this.max_frame_tick = 1
            this.removable = true     
        }
        else{
            this.removable = true
        }
    }
}