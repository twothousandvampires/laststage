import Sprite from "../Sprite";

export default class CallOfPower extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 11;
        this.max_frame_tick = 4;
        this.sprite_h = 60;
        this.sprite_w = 60;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 1000
        this.by_centr = true
        this.is_bottom = true
    }
}