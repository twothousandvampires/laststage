import Sprite from "../Sprite";

export default class PlagueBombExplode extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 8;
        this.max_frame_tick = 3;
        this.sprite_h = 70;
        this.sprite_w = 70;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 1360
        this.removable = true
    }
}