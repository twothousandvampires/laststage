import Sprite from "../Sprite";

export default class WeakCourage extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 16;
        this.max_frame_tick = 3;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 140
        this.is_bottom = true
        this.by_centr = true
    }
}