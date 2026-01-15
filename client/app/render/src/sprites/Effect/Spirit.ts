import Sprite from "../Sprite";

export default class Spirit extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 9;
        this.max_frame_tick = 1;
        this.sprite_h = 50;
        this.sprite_w = 50;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 960
        this.removable = true
    }
}