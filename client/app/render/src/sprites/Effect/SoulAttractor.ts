import Sprite from "../Sprite";

export default class SoulAttractor extends Sprite{

    constructor(id: string){
        super(id);

        this.max_frame = 11
        this.max_frame_tick = 3
        this.sprite_h = 100;
        this.sprite_w = 100;
        this.sprite_name = 'pack11'
        this.y_frame_offset = 665
        this.removable = true
        this.is_bottom = true
        this.by_centr = true
    }
}