import Sprite from "../Sprite";

export default class GoldNova extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 14
        this.max_frame_tick = 2
        this.sprite_h = 120
        this.sprite_w = 120
        this.y_frame_offset = 400
        this.sprite_name = 'pack8'
        this.removable = true
        this.by_centr = true
        this.is_bottom = true
    }
}
