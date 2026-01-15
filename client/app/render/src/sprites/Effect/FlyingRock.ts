import Sprite from "../Sprite";

export default class FlyingRock extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 6;
        this.max_frame_tick = 2;
        this.sprite_h = 40;
        this.sprite_w = 40;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 1430
    }
}