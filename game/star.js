class Star{

    constructor(){
        this.x = game.window_width + 70;
        this.y = Math.floor(random(100,230));
        this.w = 16;
        this.h = 16;
        this.type = Math.floor(random(3));
        switch (this.type) {
            case 0:
                this.img = game.sprite.get(644, 2, 9, 9);
            break;
            case 1:
                this.img = game.sprite.get(644, 11, 9, 9);
            break;
            case 2:
                this.img = game.sprite.get(644, 20, 9, 9);
            break;
        }
    }

    update(speed){
        this.x -= parseFloat(speed);
    }
    display(){
        image(this.img, this.x, this.y, this.w, this.h);
    }
}