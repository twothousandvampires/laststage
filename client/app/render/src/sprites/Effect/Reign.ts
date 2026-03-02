import Sprite from "../Sprite";

export default class Reign extends Sprite{
    constructor(id: string){
        super(id);

        this.max_frame = 27;
        this.max_frame_tick = 4
        this.sprite_h = 600;
        this.sprite_w = 600;
        this.sprite_name = 'pack13'
        this.is_bottom = true
        this.by_centr = true
    }
}