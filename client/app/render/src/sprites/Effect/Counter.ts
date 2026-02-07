import Sprite from "../Sprite";

export default class Counter extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 8
        this.max_frame_tick = 2
        this.sprite_h = 40;
        this.sprite_w = 40;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 405
        this.removable = true
    }
}