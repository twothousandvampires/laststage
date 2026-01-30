import Sprite from "../Sprite";

export default class BloodyVines extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 11;
        this.max_frame_tick = 2;
        this.sprite_h = 100;
        this.sprite_w = 100;
        this.sprite_name = 'pack10'
        this.y_frame_offset = 310
        this.removable = true
        this.is_bottom = true
        this.by_centr = true
    }
}