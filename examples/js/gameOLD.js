//basic config for game
var config = {
    type: Phaser.WEBGL,
    width: 3800,
    height: 800,
    backgroundColor: 'rgb(255, 255, 255)',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var stars;
var bombs;
var bullets;
var rain;
var platforms;
var cursors;
var score = 0;
var pauseEnd = 0;
var gameOver = false;
var scoreText;
var keys;
var spaceBar;
var colour1; 
var colour2;
var fire;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ground', 'assets/platformBrick.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('raindrop', 'assets/raindrop.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('spike', 'assets/spike.png', { frameWidth: 39, frameHeight: 48 });
    this.load.image('flame', 'assets/flame.png');
}

function create ()
{
    
    rain = this.add.particles('raindrop');

    rain.createEmitter({
        x: { min: 1, max: 1800 },
        y: 0,
        lifespan: 2000,
        speedY: { min: 200, max: 400 },
        gravityY: 100,
        gravityX: Phaser.Math.Between(100, 200),
        scale: { start: 0.4, end: 0 },
        quantity: 4,
        blendMode: 'ADD'
    });



    colour1 = new Phaser.Display.Color(155, 155, 155);
    colour2 = new Phaser.Display.Color(0, 0, 0);
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    var height = (level1.length-1)*48;
    var width = level1[0].length*48;
    game.resize(width, height);
    this.cameras.main.setBounds(0, 0, width, height); 

    // Create the level by going through the array
    for (var y = 0; y < level1.length; y++) {
        for (var x = 0; x < level1[y].length; x++) {
            // Create a new platform sprites and add them to the platforms group
            if (level1[y][x] == 'x') {
                platforms.create(48*x, 48*y, 'ground').refreshBody();
            }
            else if(level1[y][x] == 'r') {
                platforms.create(48*x, 48*y, 'ground').refreshBody();
                var platform = platforms.getChildren();
                console.log(platforms.length-1);
                platform[platforms.getTotalUsed()-1].rotation = Phaser.Math.FloatBetween(.2, .5);
            }
        }
    }

    // The player and its settings
    player = this.physics.add.sprite(20, 10, 'spike');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(.1);

    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
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

    //  Input Events
    keys = this.input.keyboard.addKeys('W,S,A,D');
    //shoot key
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: level1[0].length,
        setXY: { x: 12, y: 48, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //add bullets group
    bullets = this.physics.add.group();

    //add bombs group
    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bullets, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //  Checks to see if the player overlaps with any of the bombs, if he does call the hitBomb function
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.physics.add.collider(player, bullets, bulletHit, null, this);

    this.input.on('pointerdown', function (pointer) {
        rain();;
    }, this);

    fire = this.add.particles('flame');

    fire.createEmitter({
        alpha: { start: 1, end: 0 },
        scale: { start: 0.1, end: 2.5 },
        speed: 2,
        accelerationY: -300,
        angle: { min: -195, max: -195 },
        rotate: { min: -180, max: 180 },
        lifespan: { min: 1000, max: 1100 },
        blendMode: 'ADD',
        frequency: 110,
        maxParticles: 10,
        x: 400,
        y: 300
    });
}

function update ()
{

    if(Phaser.Input.Keyboard.JustDown(spaceBar))
    {
        shoot();
    }

    if (keys.A.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (keys.D.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (keys.W.isDown && player.body.touching.down)
    {
        //csound.inputMessage("i1 0 .1 1000 500");
        player.setVelocityY(-240);
    }

    scoreText.x = this.cameras.main.scrollX;
    this.cameras.main.scrollX = player.x - 400;
    rain.x = player.x-400;

    if (score%10 === 0)
    {
        shoot();
        score++;
    }

    var hexColour = Phaser.Display.Color.Interpolate.ColorWithColor(colour1, colour2, Phaser.Math.FloatBetween(0, 10), Phaser.Math.FloatBetween(0, 10));
    this.cameras.main.setBackgroundColor(hexColour);

    
    if (gameOver==true)
    {
        //brute force reload
        if(pauseEnd>100)
            location.reload(); 
        pauseEnd++;
    }
}

function shoot()
{
    var bullet = bullets.create(player.x, player.y, 'bomb');
    bullet.setBounce(1);
    bullet.setCollideWorldBounds(true);
    bullet.setVelocity(400, 0);
    bullet.allowGravity = false;
}


function bulletHit (player, bullet)
{
    gameOver = true;
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    sleep(5000);
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    //csound.inputMessage("i1 0 .1 500 1500");
    //  Add and update the score
    score += 1;
    scoreText.setText('Score: ' + score);
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

