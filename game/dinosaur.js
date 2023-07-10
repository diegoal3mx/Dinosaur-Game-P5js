class Dinosaur {
    x; w; y; h; last_jump_y; img_index; img_crouching_index;
    jumping; crouching; living; stop_jumping; will_die;
    jump_stage;
    img; img_running_1; img_running_2; img_running_3; img_crouching_1; img_crouching_2; img_die; img_die_night;
    imgs = [3];
    crouching_imgs = [2];
    xPositionOfCollisionBoxes = [2,12,12,16,20,20,37,28,39];
    yPositionOfCollisionBoxes = [30,42,52,60,67,72,72,30,4];
    collisionBoxes = [];
    activeCollisionBoxes = [];
    crouchCollisionBoxes = [];

    Dinosaur(){
        x = 200;
        y = 450;
        w = 80;
        h = 86;
        jumping = false;
        living = true;
        jump_stage = 0;
        crouching = false;
        createCollisionBoxes();
        createCrouchCollisionBoxes();
        activeCollisionBoxes=collisionBoxes;
    }

    f(x){
        return (-4*parseFloat(x)*(parseFloat(x)-1))*172;
    }

    update(){ 
        if(jumping){ 
            y=448-parseInt(f(jump_stage));
            jump_stage += 0.03;
            last_jump_y = y;
            img = img_running_1;
         
            if(jump_stage>1){
                jumping = false;
                jump_stage = 0;
                y = 450;
            }
        }
        else if(crouching){
            if(frameCount%10==0 && !will_die){
                img = crouching_imgs[img_crouching_index ^= 1];
            }
        }
        else{ 
            if(frameCount%10==0){
                img_index++;
                if(img_index==3){
                    img_index = 0;
                }
                img = imgs[img_index];
            }
        }
        updateYCollisionBoxes();
    }

    doInitialJump(){
        if(this.jumping){
            this.y=448-parseInt(f(jump_stage));
            this.jump_stage += 0.03;
            this.last_jump_y = y;
            this.img = img_running_1;
         
            if(this.jump_stage>1){
                this.jumping = false;
                this.jump_stage = 0;
                this.y = 450;
                game.started = true;
            }
        }
    }

    jump(){
        jumping = true;
    }

    die(... enemy_height){ 
        living = false;

        if(game.night){
            image(game.imgGameOverNight, ((game.window_width/2)-174), 350, 347, 20);
            img = img_die_night;
        }
        else{
            image(game.imgGameOver, ((game.window_width/2)-174), 350, 347, 20);
            img = img_die;
        }
        
        if(isCrouching() && isStoppingJumping()){
            stop_crouch();
        }
        else if (isCrouching()){
            stop_crouch();
            x+=30;
        }
    
        eh = (enemy_height.length >= 1) ? enemy_height[0] : null;
         
        if(eh != null){
           y = eh-(h-5);
        }
        w = 80;
        h = 86;
        activeCollisionBoxes = collisionBoxes;
        updateXYCollisionBoxes();
        noLoop();
    }

    stop_jump(... stop_jump_enemy_height){

        eh = (stop_jump_enemy_height.length >= 1) ? stop_jump_enemy_height[0] : null;
         
        if(eh != null){
           y = eh-(h-5);
        }
        else{
            y = 450;
        }

        jumping = false;
        jump_stage = 0;
        crouch();
    }

    crouch(){
        
        if(y<=450 && !will_die && living){
        crouching = true;
        activeCollisionBoxes = crouchCollisionBoxes;
        y += 34;
        w = 110;
        h = 52;
        }
        else if (y<=450){
            crouching = true;
        }

        updateCrouchingImage();

    }
    
    updateCrouchingImage(){
        if(will_die){
            img = img_die;
        }
        else{
            img = crouching_imgs[img_crouching_index];
        }
    }

    stop_crouch(){
    
        if(y>450){
            crouching = false;
            stop_jumping = false;
            activeCollisionBoxes = collisionBoxes;
            y -= 34;
            w = 80;
            h = 86;
        }
       
        if(living){
            img = imgs[img_index];
        }

        updateYCollisionBoxes();
 
    }
    
    createCollisionBoxes(){
        for (b in new CollisionBox(6,0).getCollisionBoxes()){
            collisionBoxes.add(b);
        } 
    }

    createCrouchCollisionBoxes(){
        for (b in new CollisionBox(7,0).getCollisionBoxes()){
            crouchCollisionBoxes.add(b);
        } 
    }

    updateYCollisionBoxes(){
        for (let i=0; i<collisionBoxes.size();i++){
            collisionBoxes.get(i).y=y+yPositionOfCollisionBoxes[i];
        }
    }

    updateXYCollisionBoxes(){
        for (let i=0; i<collisionBoxes.size();i++){
            collisionBoxes.get(i).x=x+xPositionOfCollisionBoxes[i];
        }
        updateYCollisionBoxes();
    }

    display(){
        image(this.img, this.x, this.y, this.w, this.h);
    }

    isJumping(){
        return this.jumping;
    }

    isStoppingJumping(){
        return this.stop_jumping;
    }

    isCrouching(){
        return this.crouching;
    }

    isAlive(){
        return this.living;
    }
}