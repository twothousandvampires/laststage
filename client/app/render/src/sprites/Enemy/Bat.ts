import UnitSprite from "../UnitSprite"

export default class Bat extends UnitSprite{
   
    real_x: number
    real_y: number
   
    constructor(id: string){
      super(id)
      this.real_x = 2
      this.real_y = 2
      this.sprite_h = 40
      this.sprite_w = 40
    }
    
    setState(state: string){
        this.state = state
        this.sprite_name = 'pack11'
        this.y_frame_offset = 1120
        this.max_frame = 13
        this.max_frame_tick = 2
    }
}