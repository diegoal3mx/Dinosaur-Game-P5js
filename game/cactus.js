class Cactus{

    constructor(){

        this.randomDistance = Math.floor(random (40,80));
        this.x = game.window_width + this.randomDistance;
        this.type = Math.floor(random(6));
        this.collisionBoxes=[];

        if(this.type < 3){
            this.h = 66;
            this.y = 470;
        }else{
            this.h = 96;
            this.y = 444;
        }
        switch (this.type) {
            case 0:
                this.w = 30;
                this.img = game.sprite.get(228, 2, 17, 35);
            break;
            case 1:
                this.w = 64;
                this.img = game.sprite.get(245, 2, 34, 35);
            break;
            case 2:
                this.w = 98;
                this.img = game.sprite.get(279, 2, 51, 35);
            break;
            case 3:
                this.w = 46;
                this.img = game.sprite.get(332, 2, 25, 50);
            break;
            case 4:
                this.w = 96;
                this.img = game.sprite.get(357, 2, 50, 50);
            break;
            case 5:
                this.w = 146;
                this.img = game.sprite.get(407, 2, 75, 50);
            break;
        }
        this.createCollisionBoxes(this.randomDistance-70);
    }

    update(speed){
        this.x -= speed;
    }
    createCollisionBoxes(distanceOffset){
        for (let b of new CollisionBox(this.type,distanceOffset).getCollisionBoxes()){
            this.collisionBoxes.push(b);
        }
    }
    display(){
        image(this.img, this.x, this.y, this.w, this.h);
    }
}