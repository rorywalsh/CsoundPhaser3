class GameScene extends Phaser.Scene {

    constructor (config)
    {
        super(config);
        this.colour1 = new Phaser.Display.Color(155, 155, 155);
        this.colour2 = new Phaser.Display.Color(0, 0, 0);
        this.normalColour = new Phaser.Display.Color(60, 60, 60);
        this.lightningTime = 1000;
        this.score = 0;
        this.numberOfBombs = 0;
        this.isCurrentBombVertical = true;
        this.bombIsActive = false;
        this.isGameOver = false;
        this.platformOffset = 0;
        this.lastSavePoint = {
        x: 48,
        y: 48};
        this.cannonBallAngle = -600;
    }

    preload() 
    {
        this.load.image('platform', 'assets/platform.png');
        this.load.image('cannonBall', 'assets/cannonBall.png');
        this.load.image('launcher', 'assets/launcher.png');
        this.load.image('ulauncher', 'assets/launcherUpsideDown.png');
        this.load.image('movingPlatform', 'assets/movingPlatform.png');
        this.load.image('fallingPlatform', 'assets/fallingPlatform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('raindrop', 'assets/rainDrop.png');
        this.load.image('vbomb', 'assets/vbomb.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('hbomb', 'assets/hbomb.png');
        this.load.image('razorGrass', 'assets/badGrass.png');
        this.load.spritesheet('spike', 'assets/spike.png', { frameWidth: 39, frameHeight: 48 });
        this.load.image('flame', 'assets/flame.png');

    }

    create() 
    {    
        //start lightning callback
        this.timedEvent1 = this.time.addEvent({ delay: 1000, callback: this.triggerLightning, callbackScope: this});
        this.timedEvent2 = this.time.addEvent({ delay: 1000, callback: this.triggerCannonBalls, callbackScope: this});
        
        this.addKeys();        
        this.addRain();        
        
        this.buildLevel(); 
        this.addAnimations();         
        this.addPlayer();
        this.addStars();

        this.scoreText = this.add.text(16, 16, 'score: 0 bombs: 0', { fontWeight: 'bold', fontSize: '32px', fill: '#fff' });
        this.addCollisionsAndOverlaps();

        this.tempBombs = this.physics.add.staticGroup();

    }

    //=====================================================
    // main game loop
    //=====================================================
    update() 
    {

        this.handlePlayerInput();
        this.showLightning();

        this.scoreText.x = this.cameras.main.scrollX;
        this.cameras.main.scrollX = this.player.x-300;
        this.rain.x = this.player.x-400;
    
        // if (this.score%10 === 0){
        //     this.bombDrop();
        //     this.score++;
        // }
         
        
    }

    handlePlayerInput()
    {
        if (this.keys.A.isDown){
            this.stickToPlatform = false;
            this.player.setVelocityX(-160);   
            csound.setControlChannel("xPos", this.player.x*10); 
            this.player.anims.play('left', true);
        }
        else if (this.keys.D.isDown){
            this.stickToPlatform = false;
            this.player.setVelocityX(160);    
            csound.setControlChannel("xPos", this.player.x*10); 
            this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);    
            this.player.anims.play('turn');
        }

        if(this.keys.B.isDown){
            if(this.numberOfBombs>0){
                var bomb = this.activeBombs.create(this.player.x, this.player.y, (this.isCurrentBombVertical == true ? 'vbomb' : 'hbomb'));
                bomb.body.allowGravity = false;
                bomb.numberOfBounces = 0;
                this.bombIsActive = false;
                this.time.addEvent({ delay: 1000, callback: this.dropBomb, callbackScope: this});
                this.numberOfBombs=0;
            }
            
        }
        
    
        if (this.keys.W.isDown && this.player.body.touching.down){
            //csound.inputMessage("i1 0 .1 1000 500");
            this.player.setVelocityY(-540);
            this.player.setGravityY(1040);
            this.stickToPlatform = false;
        }

        

    }

    showLightning()
    {
        if(this.lightningTime<20){
            var hexColour = Phaser.Display.Color.Interpolate.ColorWithColor(this.colour1, this.colour2, Phaser.Math.FloatBetween(0, 10), Phaser.Math.FloatBetween(0, 10));
            this.cameras.main.setBackgroundColor(hexColour);
            this.lightningTime++;
        }
        else
            this.cameras.main.setBackgroundColor(this.normalColour);
    }
    //========================================================
    // add methods to populate the scene
    //========================================================
    addRain()
    {
        this.rain = this.add.particles('raindrop');
        this.rain.createEmitter({
            x: { min: 1, max: 1800 },
            y: 0,
            lifespan: 1200,
            speedY: { min: 200, max: 400 },
            gravityY: 100,
            gravityX: Phaser.Math.Between(100, 200),
            scale: { start: 0.1, end: 0.2 },
            quantity: 10,
            blendMode: 'SCREEN'
        });
    }

    buildLevel()
    {
        this.door = this.physics.add.staticGroup(); 
        this.cannons = this.physics.add.staticGroup(); 
        this.cannonBalls = this.physics.add.group();
        this.activeBombs = this.physics.add.group();
        this.launchers = this.physics.add.group();
        this.pickupBombs = this.physics.add.group();
        this.platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.physics.add.group();
        this.razorGrass = this.physics.add.staticGroup();
        var height = (mainLevel.length-1)*48;
        var width = mainLevel[0].length*48;
        this.physics.world.bounds.width = width;
        this.physics.world.bounds.height = height
       // this.game.resize(width, height);
        this.cameras.main.setBounds(0, 0, width, height); 


        // Create the level by going through the mainLevel(see mainLevel.js) array
        for (var y = 0; y < mainLevel.length; y++) {
            for (var x = 0; x < mainLevel[y].length; x++) {
                // Create a new platform sprites and add them to the platforms group
                if (mainLevel[y][x] == 'x') {
                    this.platforms.create(48*x, 48*y, 'platform').refreshBody();
                }
                else if(mainLevel[y][x] == 'r') {
                    this.platforms.create(48*x, 48*y, 'platform').refreshBody();
                    var platform = this.platforms.getChildren();
                    platform[this.platforms.getTotalUsed()-1].rotation = Phaser.Math.FloatBetween(.2, .5);
                }
                else if(mainLevel[y][x] == 'g') {
                    this.razorGrass.create(48*x, 50*y, 'razorGrass').refreshBody();
                }
                else if(mainLevel[y][x] == 'l') {
                    this.cannons.create(48*x, 48*y, 'launcher').refreshBody();
                    var launchers = this.cannons.getChildren();
                    launchers[this.cannons.getTotalUsed()-1].orientation = 'up';
                }
                else if(mainLevel[y][x] == 'u') {
                    this.cannons.create(48*x, 48*y, 'ulauncher').refreshBody();
                    var launchers = this.cannons.getChildren();
                    launchers[this.cannons.getTotalUsed()-1].orientation = 'down';
                }
                else if(mainLevel[y][x] == 'd') {
                    this.door.create(48*x, 48*y, 'door').body.allowGravity = false;
                }
                else if(mainLevel[y][x] == 'b' || mainLevel[y][x] == 'h') {
                     var newBomb = this.pickupBombs.create(48*x, 50*y, (mainLevel[y][x]=='b' ? 'vbomb' : 'hbomb'));
                     newBomb.body.setAllowGravity(false);
                     newBomb.name = (mainLevel[y][x]=='b' ? "vertical" : "horizontal");
                }
                else if(mainLevel[y][x] == 'f') {
                    this.movingPlatforms.create(48*x, 48*y, 'fallingPlatform').body.allowGravity = false;
                    var movingPlatform = this.movingPlatforms.getChildren()[this.movingPlatforms.getTotalUsed()-1];
                    //this.movingPlatforms.getChildren()[this.movingPlatforms.getTotalUsed()-1];
                    this.tweens.add({
                        targets: movingPlatform,
                        x: '+=96',
                        delay: Phaser.Math.Between(10, 1000),
                        ease: 'Power1',
                        duration: Phaser.Math.Between(500, 5000),
                        yoyo: true,
                        repeat: -1
                    });                
                }
                else if(mainLevel[y][x] == 'm') {
                    this.movingPlatforms.create(48*x, 48*(y+3), 'movingPlatform').body.allowGravity = false;
                    var movingPlatform = this.movingPlatforms.getChildren()[this.movingPlatforms.getTotalUsed()-1];
                    movingPlatform.setImmovable(true);
                    this.tweens.add({
                        targets: movingPlatform,
                        x: '+=96',
                        delay: Phaser.Math.Between(10, 1000),
                        ease: 'Power1',
                        duration: Phaser.Math.Between(500, 5000),
                        yoyo: true,
                        repeat: -1
                    });                
                }
            }
        }
    }


    addAnimations()
    {
        //  Our player animations, turning, walking left and walking right
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('spike', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'spike', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('spike', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    addPlayer()
    {
        this.player = this.physics.add.sprite(this.lastSavePoint.x, this.lastSavePoint.y-48, 'spike');
        this.player.displayHeight = 45;
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(.1);    
    }

    addStars()
    {
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: mainLevel[0].length,
            setXY: { x: 12, y: 48, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }, this);
    }

    addCollisionsAndOverlaps()
    {
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.razorGrass, this.razorGrassHit, null, this);
        this.physics.add.collider(this.cannonBalls, this.platforms, this.cannonBallHitPlatform, null, this);
        this.physics.add.collider(this.cannonBalls, this.player, this.cannonBallHitPlayer, null, this);
        this.physics.add.collider(this.player, this.movingPlatforms, this.movingPlatformHit, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.activeBombs, this.platforms, this.bombPlatformHit, null, this);
        this.physics.add.collider(this.activeBombs, this.player, this.bombPlayerHit, null, this);
        this.physics.add.collider(this.stars, this.razorGrass, this.starsKillHit, null, this);
        this.physics.add.collider(this.stars, this.cannons, this.starsKillHit, null, this);
        this.physics.add.collider(this.cannonBalls, this.player, this.killPlayerHit, null, this);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.pickupBombs, this.bombPickup, null, this);
        this.physics.add.overlap(this.player, this.door, this.exitLevel, null, this);

        //  Checks to see if the player overlaps with any of the bombs, if he does call the hitBomb function
        //this.physics.add.collider(this.player, this.bombs, this.shootBomb, null, this);
    }

    addKeys()
    {
        this.keys = this.input.keyboard.addKeys('W,S,A,D,B');
    }

    //==============================================================
    // callback methods
    //==============================================================
    collectStar (player, star)
    {
        this.lastSavePoint.x = star.x;
        this.lastSavePoint.y = star.y;
        star.disableBody(true, true);
        this.scoreText.setText('Score: ' + this.score++ + ' Bombs:' + this.numberOfBombs);
    }

    triggerLightning ()
    {
        this.timedEvent1.reset({ delay: Phaser.Math.Between(2000,15000), callback: this.triggerLightning, callbackScope: this, repeat: 1});
        this.lightningTime = 0;
    }

    triggerCannonBalls()
    {
        this.timedEvent2.reset({ delay: 500, callback: this.triggerCannonBalls, callbackScope: this, repeat: 1});
        
        this.cannons.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            var cannonBall = this.cannonBalls.create(child.x, child.y, 'cannonBall').setDisplaySize(8, 8);
            cannonBall.setBounce(1);
            cannonBall.setCollideWorldBounds(true);
            if(child.orientation == 'up')
            cannonBall.setVelocity(this.cannonBallAngle, Phaser.Math.Between(-1000, -600));
            else
            cannonBall.setVelocity(this.cannonBallAngle, Phaser.Math.Between(1000, 600));

            cannonBall.allowGravity = false;
            }, this);
        this.cannonBallAngle = this.cannonBallAngle < 400 ? this.cannonBallAngle + 50 : -400;

    }

    bombPickup(player, bomb)
    {
        bomb.disableBody(true, true);
        if(bomb.name == 'vertical')
            this.isCurrentBombVertical = true;
        else
            this.isCurrentBombVertical = false;
        this.scoreText.setText('Score: ' + this.score + ' Bombs:' + this.numberOfBombs++);
    }

    razorGrassHit(player, bomb)
    {
        this.gameOver();
    }

    starsKillHit(star, grass)
    {
        star.disableBody(true, true);
    }

    exitLevel(star, grass)
    {
       console.log("Exit level");
    }

    cannonBallHitPlatform(cannonBall, platform)
    {
        cannonBall.disableBody(true, true);
    }

    bombPlayerHit(activeBomb, platform)
    {
        if(this.bombIsActive)
            this.gameOver();
    }

    cannonBallHitPlayer(cannonBall, player)
    {
        this.gameOver();
        
    }

    bombPlatformHit(activeBomb, platform)
    {   
        activeBomb.numberOfBounces++;
        
        if(activeBomb.numberOfBounces==2)
            activeBomb.disableBody(false, true);    
        
            platform.disableBody(true, true);
    }

    movingPlatformHit(player, platform)
    {
        if(this.stickToPlatform==false)
        {
            this.platformOffset = player.x-platform.x;
        }

        player.x = platform.x+this.platformOffset;
        
        this.stickToPlatform = true;
        
    }

    //non-callback events, triggered during game play
    dropBomb()
    {
        var platformChildren = this.platforms.getChildren();
        var bomb = this.activeBombs.getChildren()[this.activeBombs.getTotalUsed()-1];
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        if(this.isCurrentBombVertical == true)
            bomb.setVelocity(0, 400);
        else
            bomb.setVelocity(400, 0);

        bomb.allowGravity = false;
        this.bombIsActive = true;
    }

    gameOver()  //game over method
    {
        console.log("GameOver");
        this.score = 0;
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.cameras.main.shake(200);        
        this.time.delayedCall(500, function() {
        this.scene.restart();
        }, [], this);
    }

}


//basic config for game
var config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 600,
    backgroundColor: 'rgb(255, 255, 255)',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: GameScene,
    fps: {
        target: 20,
        min: 10,
        forceSetTimeOut: true
      }
};


var game = new Phaser.Game(config);
