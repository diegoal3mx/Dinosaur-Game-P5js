class Dinosaur {
    constructor(){
        this.x = 200;
        this.w = 80;
        this.y = 450;
        this.h = 86;
        this.last_jump_y = 0;
        this.img_index = 0;
        this.img_crouching_index = 0;
        this.jumping = false;
        this.crouching = false;
        this.living = true;
        this.stop_jumping = false;
        this.will_die = false;
        this.jump_stage = 0;
        this.img;
        this.img_running_1;
        this.img_running_2;
        this.img_running_3;
        this.img_crouching_1;
        this.img_crouching_2;
        this.img_die;
        this.img_die_night;
        this.imgs = [];
        this.crouching_imgs = [];
        this.xPositionOfCollisionBoxes = [2, 12, 12, 16, 20, 20, 37, 28, 39];
        this.yPositionOfCollisionBoxes = [30, 42, 52, 60, 67, 72, 72, 30, 4];
        this.collisionBoxes = [];
        this.activeCollisionBoxes;
        this.crouchCollisionBoxes = [];
        this.createCollisionBoxes();
        this.createCrouchCollisionBoxes();
        this.activeCollisionBoxes = this.collisionBoxes;
    }

    f(x){
        return (-4*parseFloat(x)*(parseFloat(x)-1))*172;
    }

    update(){ 
        if(this.jumping){ 
            this.y=448-Math.floor(this.f(this.jump_stage));
            this.jump_stage += 0.03;
            this.last_jump_y = this.y;
            this.img = this.img_running_1;
         
            if(this.jump_stage>1){
                this.jumping = false;
                this.jump_stage = 0;
                this.y = 450;
            }
        }
        else if(this.crouching){
            if(frameCount%10==0 && !this.will_die){
                this.img = this.crouching_imgs[this.img_crouching_index ^= 1];
            }
        }
        else{ 
            if(frameCount%10==0){
                this.img_index++;
                if(this.img_index==3){
                    this.img_index = 0;
                }
                this.img = this.imgs[this.img_index];
            }
        }
        this.updateYCollisionBoxes();
    }

    doInitialJump(){
        if(this.jumping){
            this.y=448-Math.floor(this.f(this.jump_stage));
            this.jump_stage += 0.03;
            this.last_jump_y = this.y;
            this.img = this.img_running_1;
         
            if(this.jump_stage>1){
                this.jumping = false;
                this.jump_stage = 0;
                this.y = 450;
                game.started = true;
            }
        }
    }

    jump(){
        this.jumping = true;
    }

    die(... enemy_height){ 
        this.living = false;

        if(game.night){
            image(game.imgGameOverNight, ((game.window_width/2)-174), 350, 347, 20);
            this.img = this.img_die_night;
        }
        else{
            image(game.imgGameOver, ((game.window_width/2)-174), 350, 347, 20);
            this.img = this.img_die;
        }
        
        if(this.isCrouching() && this.isStoppingJumping()){
            this.stop_crouch();
        }
        else if (this.isCrouching()){
            this.stop_crouch();
            this.x+=30;
        }
    
        let eh = (enemy_height.length >= 1) ? enemy_height[0] : null;
         
        if(eh != null){
           this.y = eh-(this.h-5);
        }
        this.w = 80;
        this.h = 86;
        this.activeCollisionBoxes = this.collisionBoxes;
        this.updateXYCollisionBoxes();
        noLoop();
    }

    stop_jump(... stop_jump_enemy_height){

        let eh = (stop_jump_enemy_height.length >= 1) ? stop_jump_enemy_height[0] : null;
         
        if(eh != null){
           this.y = eh-(this.h-5);
        }
        else{
            this.y = 450;
        }

        this.jumping = false;
        this.jump_stage = 0;
        this.crouch();
    }

    crouch(){
        
        if(this.y<=450 && !this.will_die && this.living){
            this.crouching = true;
            this.activeCollisionBoxes = this.crouchCollisionBoxes;
            this.y += 34;
            this.w = 110;
            this.h = 52;
        }
        else if (this.y<=450){
            this.crouching = true;
        }

        this.updateCrouchingImage();

    }
    
    updateCrouchingImage(){
        if(this.will_die){
            this.img = this.img_die;
        }
        else{
            this.img = this.crouching_imgs[this.img_crouching_index];
        }
    }

    stop_crouch(){
    
        if(this.y>450){
            this.crouching = false;
            this.stop_jumping = false;
            this.activeCollisionBoxes = this.collisionBoxes;
            this.y -= 34;
            this.w = 80;
            this.h = 86;
        }
       
        if(this.living){
            this.img = this.imgs[this.img_index];
        }

        this.updateYCollisionBoxes();
 
    }
    
    createCollisionBoxes(){
        for (let b of new CollisionBox(6,0).getCollisionBoxes()){
            this.collisionBoxes.push(b);
        } 
    }

    createCrouchCollisionBoxes(){
        for (let b of new CollisionBox(7,0).getCollisionBoxes()){
            this.crouchCollisionBoxes.push(b);
        } 
    }

    updateYCollisionBoxes(){
        for (let i=0; i<this.collisionBoxes.length;i++){
            this.collisionBoxes[i].y=this.y+this.yPositionOfCollisionBoxes[i];
        }
    }

    updateXYCollisionBoxes(){
        for (let i=0; i<this.collisionBoxes.length;i++){
            this.collisionBoxes[i].x=this.x+this.xPositionOfCollisionBoxes[i];
        }
        this.updateYCollisionBoxes();
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