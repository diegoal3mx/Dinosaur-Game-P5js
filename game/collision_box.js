class CollisionBox{

    constructor(entityType, distanceOffset, ... bird_y){

        if (arguments.length === 4) {
            this.x = arguments[0];
            this.y = arguments[1];
            this.w = arguments[2];
            this.h = arguments[3];
        }
        else {
            this.by = (bird_y.length >= 1) ? bird_y[0] : null;
            this.type = entityType;
            if(this.type!=6 && this.type!=7){
                this.x = game.window_width + distanceOffset;
            }
            this.boxes = [];

            switch (this.type) {
                case 0:
                    this.boxes.push(new CollisionBox(this.x+70,486,10,29));
                    this.boxes.push(new CollisionBox(this.x+78,472,12,64));
                    this.boxes.push(new CollisionBox(this.x+89,478,10,29));
                break;
                case 1:
                    this.boxes.push(new CollisionBox(this.x+70,487,11,29));
                    this.boxes.push(new CollisionBox(this.x+80,472,11,64));
                    this.boxes.push(new CollisionBox(this.x+90,479,12,29));
            
                    this.boxes.push(new CollisionBox(this.x+101,479,12,25));
                    this.boxes.push(new CollisionBox(this.x+112,472,12,64));
                    this.boxes.push(new CollisionBox(this.x+123,479,10,33));
                break;
                case 2:
                    this.boxes.push(new CollisionBox(this.x+71,487,11,29));
                    this.boxes.push(new CollisionBox(this.x+80,472,11,64));
                    this.boxes.push(new CollisionBox(this.x+90,479,12,29));
               
                    this.boxes.push(new CollisionBox(this.x+101,478,12,39));
                    this.boxes.push(new CollisionBox(this.x+112,472,12,64));
                    this.boxes.push(new CollisionBox(this.x+123,485,12,37));

                    this.boxes.push(new CollisionBox(this.x+134,477,12,31));
                    this.boxes.push(new CollisionBox(this.x+145,472,12,64));
                    this.boxes.push(new CollisionBox(this.x+156,479,10,33));
                break;
                case 3:
                    this.boxes.push(new CollisionBox(this.x+71,469,15,36));
                    this.boxes.push(new CollisionBox(this.x+85,446,16,90));
                    this.boxes.push(new CollisionBox(this.x+100,465,14,39));
                break;
                case 4:
                    this.boxes.push(new CollisionBox(this.x+71,469,15,36));
                    this.boxes.push(new CollisionBox(this.x+85,446,16,90));
                    this.boxes.push(new CollisionBox(this.x+100,465,18,37));

                    this.boxes.push(new CollisionBox(this.x+117,456,18,39));
                    this.boxes.push(new CollisionBox(this.x+134,446,16,90));
                    this.boxes.push(new CollisionBox(this.x+149,465,15,39));
                break;
                case 5:
                    this.boxes.push(new CollisionBox(this.x+71,469,16,38));
                    this.boxes.push(new CollisionBox(this.x+86,446,16,90));
                    this.boxes.push(new CollisionBox(this.x+101,466,17,37));

                    this.boxes.push(new CollisionBox(this.x+117,476,13,33));
                    this.boxes.push(new CollisionBox(this.x+129,450,12,86));
                    this.boxes.push(new CollisionBox(this.x+140,459,12,26));

                    this.boxes.push(new CollisionBox(this.x+144,491,11,26));
                    this.boxes.push(new CollisionBox(this.x+154,484,9,53));
                    this.boxes.push(new CollisionBox(this.x+162,491,11,26));

                    this.boxes.push(new CollisionBox(this.x+167,456,18,39));
                    this.boxes.push(new CollisionBox(this.x+184,446,16,90));
                    this.boxes.push(new CollisionBox(this.x+199,467,15,37));
                break;
                case 6:
                    this.boxes.push(new CollisionBox(203,480,10,23));
                    this.boxes.push(new CollisionBox(212,492,44,10));
                    this.boxes.push(new CollisionBox(212,502,40,8));
                    this.boxes.push(new CollisionBox(216,510,29,8));
                    this.boxes.push(new CollisionBox(220,517,26,7));
                    this.boxes.push(new CollisionBox(220,522,11,10));
                    this.boxes.push(new CollisionBox(237,522,11,10));
                    this.boxes.push(new CollisionBox(228,480,35,17));
                    this.boxes.push(new CollisionBox(239,454,37,28));
                break;
                case 7:
                    this.boxes.push(new CollisionBox(202,488,17,20));
                    this.boxes.push(new CollisionBox(218,488,88,30));
                    this.boxes.push(new CollisionBox(222,517,26,17));
                    this.boxes.push(new CollisionBox(247,517,22,9));
                break;
                case 8:
                    this.boxes.push(new CollisionBox(this.x+74,this.by+25,11,8));
                    this.boxes.push(new CollisionBox(this.x+82,this.by+20,19,14));
                    this.boxes.push(new CollisionBox(this.x+86,this.by+15,11,8));
                    this.boxes.push(new CollisionBox(this.x+96,this.by+30,28,12));
                    this.boxes.push(new CollisionBox(this.x+102,this.by+37,48,12));
                    this.boxes.push(new CollisionBox(this.x+102,this.by+48,33,4));
                    this.boxes.push(new CollisionBox(this.x+102,this.by+51,8,20));
                    this.boxes.push(new CollisionBox(this.x+109,this.by+51,8,8));
                break;
                case 9:
                    this.boxes.push(new CollisionBox(this.x+74,this.by+25,11,8));
                    this.boxes.push(new CollisionBox(this.x+82,this.by+20,19,14));
                    this.boxes.push(new CollisionBox(this.x+86,this.by+15,11,8));
                    this.boxes.push(new CollisionBox(this.x+96,this.by+30,28,12));
                    this.boxes.push(new CollisionBox(this.x+102,this.by+37,48,12));
                    this.boxes.push(new CollisionBox(this.x+107,this.by+48,28,4));
                    this.boxes.push(new CollisionBox(this.x+98,this.by+4,8,12));
                    this.boxes.push(new CollisionBox(this.x+102,this.by+10,12,20));
                    this.boxes.push(new CollisionBox(this.x+113,this.by+20,8,12));
                    this.boxes.push(new CollisionBox(this.x+120,this.by+27,5,4));
                break;
            }
        }
    }

    update(speed){
        this.x -= speed;
    }

    getCollisionBoxes(){
        return this.boxes;
    }

    display(){
        fill(255,0,0,50);
        rect(this.x,this.y,this.w,this.h);
    }
}