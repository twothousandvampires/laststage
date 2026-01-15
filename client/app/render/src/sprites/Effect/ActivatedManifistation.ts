import Sprite from "../Sprite";

export default class ActivatedManifistation extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 9
        this.max_frame_tick = 3
        this.sprite_w = 80
        this.sprite_h = 80
        this.sprite_name = 'pack8'
        this.y_frame_offset = 0
        this.by_centr = true
        this.is_bottom = true
    }
}