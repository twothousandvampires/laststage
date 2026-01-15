import UnitSprite from "../UnitSprite"

export default class Ancient extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 6
      this.real_y = 9
      this.sprite_h = 80
      this.sprite_w = 80
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'ancient'

        if(this.state === 'idle'){
            this.y_frame_offset = 0
            this.max_frame = 7
            this.max_frame_tick = 9
        }
        else if(this.state === 'dying'){
            this.y_frame_offset = 80
            this.max_frame = 13
            this.max_frame_tick = 2
            this.removable = true     
        }
        else{
            this.removable = true
        }
    }
}