import Sprite from "../Sprite";

export default class SingleEarthSpike extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 8;
        this.max_frame_tick = 2;
        this.sprite_h = 60;
        this.sprite_w = 40;
        this.sprite_name = 'pack10'
        this.y_frame_offset = 250
        this.removable = true
    }
}