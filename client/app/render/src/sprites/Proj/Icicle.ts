import Sprite from "../Sprite";

export default class Icicle extends Sprite{
    constructor(id: string){
        super(id)
        this.sprite_name = 'icicle'
        this.y_frame_offset = 0
        this.max_frame = 1
        this.max_frame_tick = 0
        this.sprite_h = 30
        this.sprite_w = 30

        this.init()
    }

    init(){
        let r = Math.random()
        if(r < 0.25){
            this.y_frame_offset = 0
        }
        else if(r < 0.5){
            this.y_frame_offset = 30
        }
        else if(r < 0.75){
            this.y_frame_offset = 60
        }
        else{
            this.y_frame_offset = 90
        }
    }
}