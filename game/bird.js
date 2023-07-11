class Bird{

    constructor(){
        this.randomDistance = Math.floor(random (40,80));
        this.x = game.window_width + this.randomDistance;
        this.w = 84;
        this.h = 75;
        this.img_index = 0;
        this.imgs = [];
        this.collisionBoxes = [];
        this.wingUpCollisionBoxes = [];
        this.wingDownCollisionBoxes = [];
        this.img_wing_down = game.sprite.get(134, 2, 46, 40);
        this.img_wing_up = game.sprite.get(180, 2, 46, 40);
        this.imgs [0] = this.img_wing_down; this.imgs[1] = this.img_wing_up;
        
        this.type = Math.floor(random(4));

        switch (this.type) {
            case 0:
                this.y = 385;
            break;
            case 1:
                this.y = 439;
            break;
            case 2:
                this.y = Math.floor(random(100,390));
            break;
            case 3:
                this.y = Math.floor(random(100,390));
            break;
        }

        this.createWingUpCollisionBoxes(this.randomDistance-70);
        this.createWingDownCollisionBoxes(this.randomDistance-70);
        this.collisionBoxes[0] = this.wingDownCollisionBoxes;
        this.collisionBoxes[1] = this.wingUpCollisionBoxes;
        this.activeCollisionBoxes = this.collisionBoxes[0];
    }

    update(speed){
        this.x -= speed;
      
        if(frameCount%10==0){
            image(this.imgs[this.img_index ^= 1], this.x, this.y, this.w, this.h);
            this.activeCollisionBoxes = this.collisionBoxes[this.img_index];
        }
    }

    createWingDownCollisionBoxes(distanceOffset){
        for (let b of new CollisionBox(8,distanceOffset,this.y).getCollisionBoxes()){
            this.wingDownCollisionBoxes.push(b);
        } 
    }

    createWingUpCollisionBoxes(distanceOffset){
        for (let b of new CollisionBox(9,distanceOffset,this.y).getCollisionBoxes()){
            this.wingUpCollisionBoxes.push(b);
        } 
    }

    display(){
        image(this.imgs[this.img_index], this.x, this.y, this.w, this.h);
    }
}