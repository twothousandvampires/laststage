import Sprite from "../Sprite";

export default class FlyingGold extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 1
        this.max_frame_tick = 1
        this.sprite_w = 35
        this.sprite_h = 35
        this.sprite_name = 'pack11'
        this.y_frame_offset = 1160
    }
}