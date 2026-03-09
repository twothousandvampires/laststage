import Sprite from "../Sprite";

export default class Guider extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 7;
        this.max_frame_tick = 4;
        this.sprite_w = 90;
        this.sprite_h = 90;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 1370;
    }
}