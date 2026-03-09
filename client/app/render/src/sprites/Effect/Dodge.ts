import Sprite from "../Sprite";

export default class Dodge extends Sprite {
    constructor(id) {
        super(id);
       
        this.max_frame = 8;
        this.max_frame_tick = 1;
        this.sprite_h = 40;
        this.sprite_w = 40;
        this.sprite_name = 'pack3'
        this.y_frame_offset = 1460
        this.removable = true
    }
}