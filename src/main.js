/* ROCKET PATROL MOD PROJECT
// John D. Duncan
// CMPM 120
//
// Modifications:
//      1. New Sprites for Spaceship, Rocket
//      2. New Background for Scrolling
//      3. Added New Ship, a Small yet fast Ship that 
//         flies from random x-value against the path
//         of the standard spaceships
//      4. Created a simple beat for background music
//      5. Created a title screen
//      6. Implemented Mouse Control
// Grade Breakdown:
//  Starting Tier: Total: +30
//      Back Ground Music +10
//      Player Can Control Rocket After Fired +10
//      New Background +10
//  Novice Tier: +30
//      New Enemy Spaceship Design +15
//      New Title Screen +15
//  Intermediate Tier: +75
//      New Small/Fast Spaceship +25
//      New Artwork for All in Game Assets +25
//      Implemented Mouse Control +25
//  Total: 135 
*/ 
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
   
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    podSpeed: 6,
    gameTimer: 60000   
}


// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE;

