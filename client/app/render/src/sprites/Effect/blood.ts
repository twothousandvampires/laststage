import Sprite from "../Sprite";

export default class Blood extends Sprite{
    constructor(id: string){
        super(id)

        this.max_frame = 5
        this.max_frame_tick = Math.floor(Math.random() * 3) + 1
        this.sprite_h = 30
        this.sprite_w = 30
        this.sprite_name = 'pack1'
        this.by_centr = true
        this.y_frame_offset = 690

        this.removable = true
        this.set()
    }

    set(){
        let random = Math.floor(Math.random() * 3)
        if(random === 1){
            this.sprite_name = 'pack12'
            this.sprite_h = 25
            this.sprite_w = 25
             this.y_frame_offset = 0
        }
        else if(random === 2){
            this.sprite_name = 'pack12'
            this.y_frame_offset = 25
            this.sprite_h = 25
            this.sprite_w = 25
        }
    }
}