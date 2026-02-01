import Sprite from "../Sprite";

export default class StreaksOfIce extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 11;
        this.max_frame_tick = 2;
        this.sprite_h = 150;
        this.sprite_w = 150;
        this.sprite_name = 'pack10'
        this.y_frame_offset = 455
        this.is_bottom = true
        this.removable = true
        this.by_centr = true
    }
}