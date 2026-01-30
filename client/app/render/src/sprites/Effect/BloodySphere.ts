import Sprite from "../Sprite";

export default class BloodySphere extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 6;
        this.max_frame_tick = 3;
        this.sprite_h = 45;
        this.sprite_w = 45;
        this.sprite_name = 'pack10'
        this.y_frame_offset = 410
        this.z = 5
    }
}