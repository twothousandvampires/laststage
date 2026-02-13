import Sprite from "../Sprite";

export default class HitSpark extends Sprite {

    constructor(id: string){
        super(id);
        
        this.max_frame = 10
        this.max_frame_tick = 2
        this.sprite_h = 40
        this.sprite_w = 40
        this.sprite_name = 'pack11'
        this.y_frame_offset = 1040
        this.removable = true
    }
}