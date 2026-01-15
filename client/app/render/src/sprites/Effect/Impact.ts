import Sprite from "../Sprite";

export default class Impact extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 9;
        this.max_frame_tick = 1;
        this.sprite_h = 100;
        this.sprite_w = 100;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 820
        this.is_bottom = true
        this.removable = true
        this.by_centr = true
    }
}