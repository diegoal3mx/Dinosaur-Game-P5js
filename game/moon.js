class Moon{

    img;

    constructor(){
        this.x = 1350;
        this.y = 150;
        this.w = 37;
        this.h = 75;
        this.phase = 0;
    }

    update(speed){
        this.x -= parseFloat(speed);
    }
    changePhase(){
        this.x = game.window_width + 70;
        switch (this.phase) {
            case 0:
                this.img = game.sprite.get(484, 2, 20, 40);
            break;
            case 1:
                this.img = game.sprite.get(504, 2, 20, 40);
            break;
            case 2:
                this.img = game.sprite.get(524, 2, 20, 40);
            break;
            case 3:
                this.w = 74;
                this.img = game.sprite.get(544, 2, 40, 40);
            break;
            case 4:
                this.w = 37;
                this.img = game.sprite.get(584, 2, 20, 40);
            break;
            case 5:
                this.img = game.sprite.get(604, 2, 20, 40);
            break;
            case 6:
                this.img = game.sprite.get(624, 2, 20, 40);
            break;
        }
        this.phase++;
        if(this.phase>6){
            this.phase = 0;
        }
    }
    display(){
        image(this.img, this.x, this.y,this.w, this.h);
    }
}