class Bird{

    x; y; w; h; img_index;
    img_wing_down; img_wing_up;
    imgs = [2];
    collisionBoxes = [2];
    activeCollisionBoxes;
    wingUpCollisionBoxes = [];
    wingDownCollisionBoxes = [];

    Bird(){
        let randomDistance = parseInt(random (40,80));
        x = game.window_width+randomDistance;
        w = 84;
        h = 75;
        img_index = 0;
        img_wing_down = game.sprite.get(134, 2, 46, 40);
        img_wing_up = game.sprite.get(180, 2, 46, 40);
        imgs [0] = img_wing_down; imgs[1] = img_wing_up;
        
        let type = parseInt(random(4));

        switch (type) {
            case 0:
                y = 385;
            break;
            case 1:
                y = 439;
            break;
            case 2:
                y = parseInt(random (100,390));
            break;
            case 3:
                y = parseInt(random (100,390));
            break;
        }

        createWingUpCollisionBoxes(randomDistance-70);
        createWingDownCollisionBoxes(randomDistance-70);
        collisionBoxes[0]=wingDownCollisionBoxes;collisionBoxes[1]=wingUpCollisionBoxes;
        activeCollisionBoxes=collisionBoxes[0];
    }

    update(speed){
        x -= parseInt(speed);
      
        if(frameCount%10==0){
            image(imgs[img_index ^= 1], x, y, w, h);
            activeCollisionBoxes=collisionBoxes[img_index];
        }
    }

    createWingDownCollisionBoxes(distanceOffset){
        for (b in new CollisionBox(8,distanceOffset,y).getCollisionBoxes()){
            wingDownCollisionBoxes.add(b);
        } 
    }

    createWingUpCollisionBoxes(distanceOffset){
        for (b in new CollisionBox(9,distanceOffset,y).getCollisionBoxes()){
            wingUpCollisionBoxes.add(b);
        } 
    }

    display(){
        image(imgs[img_index], x, y, w, h);
    }
}