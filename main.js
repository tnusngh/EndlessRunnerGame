// // Initialize Phaser game
// var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// // Variables
// var background1;
// var background2;
// var scrollSpeed = 5;
// var running;
// var jumpKey;
// var isJumping = false;
// var isOnGround = true;
// var jumpHeight = 250;
// var jumpDuration = 600;
// var facingRight = true;
// var platforms; // Group to hold the platforms

// // Preload assets
// function preload() {
//     game.load.image('background', 'assets/sprites/Background.png');
//     game.load.spritesheet('running', 'assets/sprites/run.png', 48, 48, 4);
//     game.load.image('platform', 'assets/sprites/platform2.png');
// }

// // Create the game
// // Create the game
// function create() {
//     game.physics.startSystem(Phaser.Physics.ARCADE);

//     // Set the backgrounds as sprites
//     background1 = game.add.sprite(0, 0, 'background');
//     background2 = game.add.sprite(background1.width, 0, 'background');

//     background1.height = game.height;
//     background1.width = background1.height * 2;

//     background2.height = game.height;
//     background2.width = background2.height * 2;

//     // Create the running sprite
//     running = game.add.sprite(50, 500, 'running');
//     running.scale.setTo(2);
//     running.anchor.setTo(0.5, 1);

//     // Add the animation for the running sprite
//     running.animations.add('run');

//     // Enable physics for the running sprite
//     game.physics.arcade.enable(running);
//     running.body.gravity.y = 1000;
//     running.body.collideWorldBounds = true;

//     // Create a group for the platforms
//     platforms = game.add.group();
//     platforms.enableBody = true;
    
//     platforms.create(200, 400, 'platform').scale.setTo(0.2);
//     platforms.create(500, 300, 'platform').scale.setTo(0.2);

//     // Create an invisible platform that extends to the end of the game area

//     // Set the initial facing direction of the sprite
//     running.scale.setTo(facingRight ? 2 : -2, 2);

//     // Add spacebar as the jump key
//     jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//     jumpKey.onDown.add(jump, this);
// }


// // Update the game state
// function update() {
//     // Check for collisions between the running sprite and the platforms
//     game.physics.arcade.collide(running, platforms);
    

//     // ... (existing code)

//     // Move the running sprite left or right
//     var runningSpeed = 150;
//     if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
//         running.body.velocity.x = -runningSpeed;
//         // Check and flip the sprite if it's not already facing left
//         if (!facingRight) {
//             running.scale.setTo(2, 2);
//             facingRight = true;
//         }
//     } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
//         running.body.velocity.x = runningSpeed;
//         // Check and flip the sprite if it's not already facing right
//         if (facingRight) {
//             running.scale.setTo(-2, 2);
//             facingRight = false;
//         }
//     } else {
//         running.body.velocity.x = 0;
//     }

//     // ... (existing code)
// }

// function collisionHandler(player, platform) {
//     console.log(0);
//     running.y=platform.y;
//     // Handle the collision between 'running' and 'platform' here
//     // For example, you might want to stop the player from falling through the platform:
    
// }

// // Function to make the running sprite jump
// function jump() {
//     if (isOnGround) {
//         isJumping = true;
//         isOnGround = false;
//         // Tween the character's y position upwards for jumpHeight pixels
//         var jumpTween = game.add.tween(running).to({ y: running.y - jumpHeight }, jumpDuration, Phaser.Easing.Linear.None, true);
//         jumpTween.onComplete.add(onJumpComplete, this);
//     }
// }

// // Function to handle the end of the jump
// function onJumpComplete() {
//     // Tween the character's y position downwards to its original position
//     var fallTween = game.add.tween(running).to({ y: game.height - running.height }, jumpDuration, Phaser.Easing.Linear.None, true);
//     fallTween.onComplete.add(onFallComplete, this);
// }

// // Function to handle the character landing on the ground
// function onFallComplete() {
//     isJumping = false;
//     isOnGround = true;
// }

// // Rest of the code remains unchanged
// // ...

































// Initialize Phaser game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var collided=false,isOnPlatform=false
// Variables
var background1;
var background2;
var scrollSpeed = 5;
var running;
var jumpKey;
var platforms=[];
var isJumping = false;
var isOnGround = true; // Added to track if the character is on the ground
var jumpHeight = 100; // Adjust the jump height as needed
var jumpDuration = 400; // Adjust the jump duration as needed
var facingRight = true; // Variable to keep track of sprite facing direction

// Preload assets
function preload() {
    game.load.image('background', 'assets/sprites/Background.png');
    game.load.spritesheet('running', 'assets/sprites/run.png', 48, 48, 4);
    game.load.image('platform', 'assets/sprites/platform2.png');
}

// Create the game
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Set the backgrounds as sprites
    background1 = game.add.sprite(0, 0, 'background');
    
    platform = game.add.sprite(200, 400, 'platform');
    platform.scale.setTo(0.2);
    platforms.push(platform);
    background1.height = game.height;
    background1.width = background1.height * 2;

    background2 = game.add.sprite(background1.width, 0, 'background');
    background2.height = game.height;
    background2.width = background2.height * 2;

    // Create the running sprite
    running = game.add.sprite(50, 500, 'running');
    running.scale.setTo(2);
    running.anchor.setTo(0.5, 1);

    // Add the animation for the running sprite
    running.animations.add('run');

    running.enableBody=true;
    // Enable physics for the running sprite
    game.physics.arcade.enable(running);

    // Add spacebar as the jump key
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpKey.onDown.add(jump, this);

    // Set the initial facing direction of the sprite
    running.scale.setTo(facingRight ? 2 : -2, 2);
    game.physics.arcade.enable(running);
    platforms.forEach(function(currplatform){
        game.physics.arcade.enable([running, currplatform]);
    });
    // game.physics.arcade.enable([running, platform]);
    // this.physics.add.collider(player, platforms)
    generatePlatform();
}

// Update the game state
function update() {

    collided=false;
    platforms.forEach(function(platform){        
        game.physics.arcade.collide(running, platform, collisionHandler, null, this);collided=true;});
    generatePlatform()

    
    if(!(game.physics.arcade.collide(running, platform)) && !isJumping  )
    {
        running.y=500;
        isOnGround = true;
        isOnPlatform = false;
    }
    // Check for key presses to scroll the backgrounds
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        // Move the backgrounds to the right
        background1.x += scrollSpeed;
        platforms.forEach(function(platform){platform.x += scrollSpeed;})
        
        background2.x += scrollSpeed;
        running.animations.play('run', 10, false);
        // Move the running sprite to the left
        // running.x += scrollSpeed * (running.width / background1.width)*facingRight?-1:1;
        
        // Check and flip the sprite if it's not already facing left
        if (!facingRight) {
            running.scale.setTo(2, 2); // Flip horizontally
            facingRight = true; // Update facing direction
        }
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        // Move the backgrounds to the left
        background1.x -= scrollSpeed;
        background2.x -= scrollSpeed;
        platforms.forEach(function(platform){platform.x -= scrollSpeed;})
        running.animations.play('run', 10, false);
        
        // Move the running sprite to the right
        // running.x += scrollSpeed * (running.width / background1.width)*facingRight?-1:1;
        
        // Check and flip the sprite if it's not already facing right
        if (facingRight) {
            running.scale.setTo(-2, 2); // Flip horizontally
            facingRight = false; // Update facing direction
        }
    }
    
    
    else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    { jump();}
     else {
        // If no arrow key is pressed, stop the animation
        running.animations.stop();
        isOnGround = false;
        running.frame = 0; // Show the first frame of the animation
    }

    // Check if the first background has scrolled past its width to the left
    if (background1.x >= background1.width) {
        background1.x -= background1.width * 2;
    }

    // Check if the second background has scrolled past its width to the left
    if (background2.x >= background2.width) {
        background2.x -= background2.width * 2;
    }

    // Check if the first background has scrolled past its width to the right
    if (background1.x <= -background1.width) {
        background1.x += background1.width * 2;
    }

    // Check if the second background has scrolled past its width to the right
    if (background2.x <= -background2.width) {
        background2.x += background2.width * 2;
    }
    // if (running.x <= -running.width) {
    //     running.x = game.width;
    // } else if (running.x >= game.width) {
    //     running.x = -running.width;
    // }
}
function collisionHandler(player, platform) {
    console.log(platform.y,player.y);;
   if(platform.y+1>=player.y){
    isJumping=false;
    game.tweens.removeAll();
    running.y=platform.y+1;
    isOnPlatform=true;
    isOnGround=true; 
   }
    // Handle the collision between 'running' and 'platform' here
    // For example, you might want to stop the player from falling through the platform:
    
}

// Function to make the running sprite jump
function jump() {
    if (isOnGround  || isOnPlatform) {
        isJumping = true;
        isOnGround = false;
        game.tweens.removeAll();

        // Tween the character's y position upwards for jumpHeight pixels
        var jumpTween = game.add.tween(running).to({ y: running.y - jumpHeight }, jumpDuration, Phaser.Easing.Linear.None, true);
        jumpTween.onComplete.add(onJumpComplete, this);
    }
}

// Function to handle the end of the jump
function onJumpComplete() {
    // Tween the character's y position downwards to its original position
    var fallTween = game.add.tween(running).to({ y: game.height - running.height }, jumpDuration, Phaser.Easing.Linear.None, true);
    fallTween.onComplete.add(onFallComplete, this);
}

// Function to handle the character landing on the ground
function onFallComplete() {
    isJumping = false;
    isOnGround = true;
}

function generatePlatform()
{

    console.log(platforms.length);
    var x= platforms[platforms.length-1].x+Math.floor(Math.random() * (300 - 80 + 1)) +80;
    // if(x-100< platforms[platforms.length-1].x)
    
    var miny =400 , maxy=450;


    if((x-platforms[platforms.length-1].x)<150){
    miny=350;
    }
    var y  = Math.floor(Math.random() * (maxy - miny + 1)) +miny;
    var newPlatform = game.add.sprite(x+150, y, 'platform');
    game.physics.arcade.enable([running, newPlatform]);
    newPlatform.enableBody=true;
    newPlatform.scale.setTo(0.2);
    platforms.push(newPlatform)
}
