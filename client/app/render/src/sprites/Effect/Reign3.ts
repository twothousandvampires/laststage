import Sprite from "../Sprite";

export default class Reign3 extends Sprite{
    constructor(id: string){
        super(id);

        this.max_frame = 26;
        this.max_frame_tick = 4
        this.sprite_h = 600;
        this.sprite_w = 600;
        this.sprite_name = 'pack13'
        this.is_bottom = true
        this.by_centr = true
        this.y_frame_offset = 1200
        this.repeatable = false
    }
}