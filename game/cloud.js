class Cloud{

    constructor(){
        this.x = game.window_width+70;
        this.y = Math.floor(random(55,300));
        this.w = 84;
        this.h = 24;
        this.img = game.sprite.get(86, 2, 46, 13);
    }

    update(speed){
        this.x -= speed;
    }
    display(){
        image(this.img, this.x, this.y, this.w, this.h);
    }
}