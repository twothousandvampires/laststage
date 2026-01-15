import Sprite from "../Sprite";

export default class AncientSkull extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 2;
        this.max_frame_tick = 6;
        this.sprite_h = 40;
        this.sprite_w = 40;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 920
        this.by_centr = true
    }
}