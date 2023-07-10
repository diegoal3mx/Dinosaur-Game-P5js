//import java.util.Iterator;

class Game {
    ground;
    moon;
    player;
    cactae;
    birds;
    clouds;
    stars;
    last_bird_x = 1350;
    speed = 12; 
    maxSpeed = 20;
    score = 0;
    highScore = 0;
    last_day_change = 1;
    window_width = 1280;
    night = false;
    started = false;
    debug = false;
    collisionBoxesVisible = false;
    fpsVisible = false;
    sprite;
    imgGameOver;
    imgGameOverNight;

    constructor(start, debugged){
        this.started = start;
        this.debug = debugged;
        this.set_debug();
        this.ground = new Ground();
        this.moon = new Moon();
        this.player = new Dinosaur();
        this.cactae = [];
        this.birds = [];
        this.clouds = [];
        this.stars = [];
    }

    update(){
        if(this.player.isAlive() && this.started){
            if(parseInt(score)%1000==0 && parseInt(score)>last_day_change){
                last_day_change = parseInt(score);
                night=!night;
                if(night){
                    moon.changePhase();
                }
            }
            this.score += 1*(speed/70);
            this.ground.update(parseInt(speed));
            this.player.update();

            if(player.will_die){
                player.die();
            }

            for (cl in clouds){
                cl.update(parseInt(speed*0.5));
            }

            for (c in cactae){
                c.update(parseInt(speed));
                for (cbc in c.collisionBoxes){
                    cbc.update(parseInt(speed));
                }
            }

            for (b in birds){
                b.update(parseInt(speed));
                for (cbb in b.wingDownCollisionBoxes){
                    cbb.update(parseInt(speed));
                }
                for (cbb in b.wingUpCollisionBoxes){
                    cbb.update(parseInt(speed));
                }
            }

            if(night){
                fill(255);
                moon.update((speed*0.021));
                for (s in stars){
                    s.update((speed*0.021));
                }
            }
            else{
                fill(32, 33, 36);
            }
            text("Score",width/2+100,50);
            text(parseInt(score,width/2+200,50));    

            if(highScore < score){
                highScore = parseInt(score);
            }

            text("High Score",width/2+280,50);
            text(highScore,width/2+460,50);

            if(!player.will_die){
                check_collisions();
            }

            if(speed<maxSpeed){
                speed += 0.001;
            }
        }
        else{
            this.started=false;
            this.player.doInitialJump();
            textSize(32);
            fill(32, 33, 36);
            text("Presiona la barra espaciadora para jugar",205,585);
        }

        if(this.fpsVisible){
            text("Fps",50,50);
            text(frameRate,100,50);
        }
    }

    display(){
        if(this.started){
            this.ground.display();
            if(this.night){
                for (s in this.stars){
                    s.display();
                }
                this.moon.display();
            }
        }
        else{
            this.ground.displayGameNotStarted();
        }
        for (cl in this.clouds){
            this.cl.display();
        }
        for (c in this.cactae){
            c.display();
            if(collisionBoxesVisible){
                for (cbc in c.collisionBoxes){
                    cbc.display();
                }
            }
        }
        for (b in this.birds){
            b.display();
            if(collisionBoxesVisible){
                for (cbb in b.activeCollisionBoxes){
                    cbb.display();
                }
            }
        }
        this.player.display();
        if(this.collisionBoxesVisible){
            for (cbp in this.player.activeCollisionBoxes){
                cbp.display();
            }
        } 
    }

    load_game(w){
        this.set_window_width(w);
        this.load_game_sprite();
        this.load_game_assets();
        this.load_ground_assets();
        this.load_player_assets();
    }
    set_window_width(w){
        this.window_width = w;
        this.ground.w = w;
        this.ground.x2 = 0-w;
        this.moon.x = w+70;
    }
    load_game_sprite(){
        this.sprite =  loadImage("../imgs/dinosaur-sprite.png");
    }
    load_game_assets(){
        this.imgGameOver =  this.sprite.get(655, 15, 191, 11);
        this.imgGameOverNight =  this.sprite.get(655, 29, 191, 11);
    }
    load_player_assets(){
        this.player.img_running_1 = this.sprite.get(848, 2, 44, 47);
        this.player.img_running_2 = this.sprite.get(936, 2, 44, 47);
        this.player.img_running_3 = this.sprite.get(980, 2, 44, 47);
        this.player.img_crouching_1 = this.sprite.get(1112, 19, 59, 30); 
        this.player.img_crouching_2 = this.sprite.get(1171, 19, 59, 30);
        this.player.img_die = this.sprite.get(1068, 2, 44, 47);
        this.player.img_die_night = this.sprite.get(1024, 2, 44, 47);
        this.player.imgs [0] = this.player.img_running_1; this.player.imgs[1] = this.player.img_running_2; this.player.imgs[2] = this.player.img_running_3;
        this.player.crouching_imgs [0] = this.player.img_crouching_1;  this.player.crouching_imgs [1] = this.player.img_crouching_2;
        this.player.img = this.player.img_running_1;
    }

    load_ground_assets(){
        this.ground.img = this.sprite.get(2, 53, 1200, 13);
        this.ground.imgGameNotStarted = this.sprite.get(40, 53, 49, 13);
    }

    spawn_enemy(){
        if(parseInt( random (10)==0)){
            if(score>450){
                birds.add(new Bird());
            }
        }
        else{
            cactae.add(new Cactus());
        }
    }

    spawn_cloud(){
        if(parseInt( random (1.5)==0)){
            clouds.add(new Cloud());
        }
    }

    spawn_star(){
        if(parseInt( random (10)==0)){
            stars.add(new Star());
        }
    }

    spawn_entities(){
        spawn_enemy();
        spawn_cloud();
        if(night){
            spawn_star();
        }
    }

    despawn_enemy(){
        for (let iterator = cactae.iterator(); iterator.hasNext();) {
            c = iterator.next();
            if(c.x+c.w<0) {
                iterator.remove();
            }
        }

        for (let iterator = birds.iterator(); iterator.hasNext();) {
            b = iterator.next();
            if(b.x+b.w<0) {
                iterator.remove();
            }
        }
    }

    despawn_cloud(){
        for (let iterator = clouds.iterator(); iterator.hasNext();) {
            cl = iterator.next();
            if(cl.x+cl.w<0) {
                iterator.remove();
            }
        }
    }

    despawn_star(){
        for (let iterator = stars.iterator(); iterator.hasNext();) {
            s = iterator.next();
            if(s.x+s.w<0) {
                iterator.remove();
            }
        }
    }

    despawn_entities(){
        despawn_enemy();
        despawn_cloud();
        if(night){
            despawn_star();
        }
    }

    check_collisions(){
        loopCollisions:
        for (cbp in this.player.activeCollisionBoxes){
            let p_x = cbp.x;
            let p_y = cbp.y;
            let p_w = cbp.w;
            let p_h = cbp.h;
            
            for (c in cactae){

                for(cbc in c.collisionBoxes){

                    if(p_x + p_w > cbc.x && p_x < cbc.x + cbc.w){
                
                        if (this.player.isJumping() ){
                            if(p_y+ p_h > cbc.y){
                                this.player.die(); break loopCollisions;
                            }
                        }
                        else{
                            this.player.stop_jumping = false;
                            if(c.type<3){
                                if(cbc.h!=29){
                                    this.player.die(); break loopCollisions;
                                }
                            }
                            else{
                                this.player.die(); break loopCollisions;
                            }
                        }
                    }
                }
            }

            if(this.player.isJumping()){
                for (let i = 0; i<birds.size(); i++){
                    if(birds.get(0).x+birds.get(0).w<200 && birds.size()>1){
                        last_bird_x = birds.get(1).x;
                    }
                    else{
                        last_bird_x = birds.get(0).x;
                    }
                }
            }
            
            for (b in birds){

                for(cbb in b.activeCollisionBoxes){

                    if(p_x + p_w > cbb.x && p_x < cbb.x + cbb.w){
               
                        if(p_y+ p_h > cbb.y && p_y < cbb.y +cbb.h){
                            this.player.stop_jumping = false;
                            this.player.x+=1;
                            this.player.die(); break loopCollisions;
                        }
                    }
                }
            }
        }
    }

     check_collisions_crouch(){
        if(score<30){
            this.player.stop_jump();
        }
        else{
            let e_y = 0;
            loopCactus:
            for (c in cactae){
                if(!this.player.will_die){
                    for(cbc in c.collisionBoxes){
                        if(this.player.x + this.player.w > cbc.x-speed && this.player.x < cbc.x-speed + cbc.w){
                            this.player.will_die=true;
                            e_y=cbc.y;
                            break;
                        }
                    }
                    if(this.player.will_die){
                        if(c.type<3){
                            if(c.x>280){
                                this.player.stop_jump(); this.player.x+=10;
                            }
                            else if(c.x>235){
                                this.player.stop_jump(); this.player.x+=6;
                            }
                            else if(c.x+c.w<240){
                                this.player.stop_jump(); this.player.x-=3;
                            }
                            else{
                                this.player.stop_jump(e_y+2);
                            }
                        }
                        else{
                            if(c.x>280){
                                this.player.stop_jump(); this.player.x+=10;
                            }
                            else if(c.x>250){
                                this.player.stop_jump(); this.player.x+=2;
                            }
                            else if(c.x+c.w<210){
                                this.player.stop_jump(e_y+10);
                            }
                            else if(c.x+c.w<240){
                                this.player.stop_jump();
                            }
                            else{
                                this.player.stop_jump(e_y+5);
                            }
                        }
                        break loopCactus;
                    } 
                    else{
                        this.player.stop_jump();
                    }  
                } 
            }
            loopBirds:
            for (b in birds){
                if(!this.player.will_die){
                    for(cbb in b.activeCollisionBoxes){
                        if(this.player.x + this.player.w > cbb.x-speed && this.player.x < cbb.x-speed + cbb.w){
                            if(this.player.last_jump_y < cbb.y  && this.player.x+this.player.w>last_bird_x ){
                                this.player.will_die=true;
                                e_y=cbb.y+10; break;
                            }
                        }
                    }
                    if(this.player.will_die){
                        if(b.x+b.w<240){
                            this.player.stop_jump(e_y+40);
                        }
                        else{
                            this.player.stop_jump(e_y);
                        }
                        break loopBirds;
                    } 
                    else{
                        this.player.stop_jump();
                    }
                }
            }
        }
    }

    getHighScore(){
        return highScore;
    }

    toggle_debug(){
        this.debug = !debug;
        set_debug();
    }

    set_debug(){
        this.collisionBoxesVisible = this.debug;
        this.fpsVisible = this.debug;
    }

    keyPressed(key){
        if (key == "UP" && this.player.isAlive() && started){
            if (!this.player.isCrouching()){
                this.player.jump();
            }
        }
        else if (key == "DOWN" && this.player.isAlive() && started){
            if(this.player.isJumping()){
                this.player.stop_jumping = true;
                check_collisions_crouch();
            }else{
                this.player.crouch();
            }
        }
        else if (key == "D"){
            toggle_debug();
        }
    }

    keyReleased(key){
        if (key == "DOWN" && this.player.isAlive() && started){
            this.player.stop_crouch();
        }
    } 
}