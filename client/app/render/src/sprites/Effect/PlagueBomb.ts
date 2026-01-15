import Sprite from "../Sprite";

export default class PlagueBomb extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 16;
        this.max_frame_tick = 5;
        this.sprite_h = 60;
        this.sprite_w = 60;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 1300
        this.repeatable = false
    }
}