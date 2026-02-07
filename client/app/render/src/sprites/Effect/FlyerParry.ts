import Sprite from "../Sprite";

export default class FlyerParry extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 5;
        this.max_frame_tick = 2
        this.sprite_h = 80;
        this.sprite_w = 80;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 310
        this.removable = true
    }
}