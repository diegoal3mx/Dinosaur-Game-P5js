class Ground{

    img; imgGameNotStarted;

    constructor(){
        this.x = 0;
        this.x2 = -1280;
        this.y = 512;
        this.w = 1280;
        this.h = 24;
    }

    update(speed){
        this.x -= speed;
        if(this.x<this.x2){
            this.x = 0;
        }
    }
    display(){
        image(this.img, this.x, this.y, this.w, this.h);
        image(this.img, this.x-this.x2, this.y, this.w, this.h);
    }
    displayGameNotStarted(){
        image(this.imgGameNotStarted, 200, this.y, 80, this.h);
    }
}