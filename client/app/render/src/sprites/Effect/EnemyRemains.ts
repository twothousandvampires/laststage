import Sprite from "../Sprite";

export default class EnemyRemains extends Sprite {
    constructor(id) {
        super(id);

        this.max_frame = 1;
        this.max_frame_tick = 244445;
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack9'
        this.y_frame_offset = 650
    }
}