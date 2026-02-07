import Sprite from "../Sprite";

export default class SoulDevouring extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 8
        this.max_frame_tick = 1
        this.sprite_h = 60;
        this.sprite_w = 60;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 505
        this.removable = true
    }
}