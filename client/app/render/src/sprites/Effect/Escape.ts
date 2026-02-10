import Sprite from "../Sprite";

export default class Escape extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 6
        this.max_frame_tick = 2
        this.sprite_h = 50;
        this.sprite_w = 50;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 765
        this.removable = true
    }
}