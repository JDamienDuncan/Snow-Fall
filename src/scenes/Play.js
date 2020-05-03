class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('skater', './assets/skater3.png');
        this.load.image('sunlight', './assets/sunlight.png');
        this.load.image('snowfield', './assets/snowfield.png');
        this.load.image('ice', './assets/ice.png');
        this.load.image('frame', './assets/frame.png');

       
        
        
    }

    create() {
        // place tile sprite
        this.snowfield = this.add.tileSprite(0, 0, 640, 480, 'snowfield').setOrigin(0, 0);
        this.icefield = this.add.tileSprite(0, 0, 640, 480, 'ice').setOrigin(0, 0);
        //this.frame = this.add.tileSprite(0, 0, 640, 480, 'frame').setOrigin(0, 0);

        // white rectangle borders
        /*this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        */

        // add Skater
        this.Player = new Skater(this, game.config.width/2 - 80, 280, 'skater').setScale(0.5, 0.5).setOrigin(0, 0);

        this.Sunlight01 = new Sunlight(this, game.config.width, 230, 'sunlight', 0, 50).setOrigin(0,0);

        

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
     

        // animation config
        

        // player 1 score
        this.p1Score = 0;
        
        
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 260
        }
        
        this.scoreLeft = this.add.text(200, 10, 'The Snow Falls', scoreConfig);
        //this.scoreRight = this.add.text(369, 54, 'FIRE', scoreConfig);
        this.sfxbackround = this.sound.add('sfx_background'); // add Player sfx
        
       

        let currentTime = game.settings.gameTimer/1000;
        scoreConfig.align = 'center';
        this.timeDisplay = this.add.text(200, 54, 'Time Left: '+currentTime, scoreConfig);
        
        // decrement timer
        let timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: function() {
                currentTime -= 1;
                this.timeDisplay.text = 'Time Left: '+currentTime;
            }, 
            callbackScope: this, 
            repeat: game.settings.gameTimer/1000 -1
            
        });

        

        

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
           
        }, null, this);
        this.sfxbackround.play();

        
    }

    update() {
        
        
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.sfxbackround.stop();
            
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sfxbackround.stop();
            
            this.scene.start("menuScene");
        }
        
        if (this.checkCollision(this.Player, this.Sunlight01)) {
            this.Sunlight01.reset();
            
        }

        this.snowfield.tilePositionX += 4;  // scroll tile sprite
        if (!this.gameOver) {               
            this.Player.update();         // update Skater sprite
            this.Sunlight01.update();
            
        }
    }
        
        checkCollision(Player, Sunlight) {
            // simple AABB checking
            if (Sunlight.x < Player.x + Player.width/2 && 
                Sunlight.x > Player.x - Player.width/2 && 
                Sunlight.y < Player.y + Player.height/2 &&
                Sunlight.y > Player.y - Player.height/2) {
                    return true;
            } 
            else {
                return false;
            }
        
        }
              
        
}