import Sprite from "../Sprite";

export default class FlyingSwords extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 6
        this.max_frame_tick = 5
        this.sprite_h = 80
        this.sprite_w = 80
        this.sprite_name = 'pack8'
        this.y_frame_offset = 950
    }
}