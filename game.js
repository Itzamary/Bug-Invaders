const gameState = {
    active: true
}

function preload() {
    // load all images for gameplay
    this.load.image('codey', './Images/codey.png');
    this.load.image('platform', './Images/platform.png');
    this.load.image('bug1', './Images/bug_1.png');
    this.load.image('bugPellet', './Images/bugPellet.png');
    this.load.image('bugRepellent', './Images/bugRepellent.png');
};
function create() {
    // gameState.active = true;

    // if gameState is not active than restart the scene on pointerup
	this.input.on('pointerup', () => {
		if (gameState.active === false) {
            // set game active state to true before restarting.
            gameState.active = true;
			this.scene.restart();
		}
	});


    // create static platform
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

    // create player
    gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

    // create enemy key as group object
    gameState.enemies = this.physics.add.group();
    // create for loop to generate enemies
    for (let yValue = 1; yValue < 4; yValue++) {
        for (let xValue = 1; xValue < 9; xValue++) {
            // create the enemies in 3 rows and 8 columns
            // set scale to 60% and set gravity so the bugs arent pulled down.
            gameState.enemies.create(50 * xValue, 50 * yValue, 'bug1').setScale(.6).setGravityY(-200);
        }
    };

    // create enemy bullets group
    const bugBullet = this.physics.add.group();
    // function to generate multiple bug bullets.
    function genBugBullets() {
        // get random bug from the enemies group
        const randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
        // create bullet at the same location as the random bug
        bugBullet.create(randomBug.x, randomBug.y, 'bugPellet');
    };

    // create loop for the function to continue running
    gameState.bulletsLoop = this.time.addEvent({
        delay: 300,
        callback: genBugBullets,
        callbackScope: this,
        loop: true
    });

    // create group of player bullets.
    gameState.playerBullet = this.physics.add.group();


    // create collider between player and platform.
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);

    // collider between bullet and platform
    this.physics.add.collider(bugBullet, platforms, (bullet) => {
        // destroy bullet when it collides with the platform.
        bullet.destroy();
    });

    // collider between bullet and player
    this.physics.add.collider(bugBullet, gameState.player, () => {
        // change game active to false
        gameState.active = false;

        // destory the bullets loop
        gameState.bulletsLoop.destroy();

        // pause the games physics.
        this.physics.pause();

        // add text so the player knows its game over.
        this.add.text(210, 250, 'Game Over \n Click to start New Game.', { fontSize: '15px', fill: '#000000'});
    });

    // create collider between player bullet and enemy
    this.physics.add.collider(gameState.enemies, gameState.playerBullet, (bug, bullet) => {
        // destroy the bug
        bug.destroy();
        // destroy the bullet
        bullet.destroy();
    });

    // create collider between player bullet and enemy bullet.
    this.physics.add.collider(gameState.playerBullet, bugBullet, (playerBullet, bugBullet) => {
        // destroy the bullet for each the playet and bug.
        playerBullet.destroy();
        bugBullet.destroy();
    })


    // create cursors object and save in the gameState object
    gameState.cursors = this.input.keyboard.createCursorKeys();
};
function update() {
    // if gameState is active than players can control codey with the keyboard.
    if (gameState.active) {
        // check which keys are being pressed
        if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-160);
        } else if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(160);
        } else {
            gameState.player.setVelocityX(0);
        };

        // check if the space key is being pressed so the player can shoot back.
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
            // create bullets on the same location as the player. and change its gravity so it shoots upward
            gameState.playerBullet.create(gameState.player.x, gameState.player.y, 'bugRepellent').setGravityY(-400);
        }
    }

};   

const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 500, 
    backgroundColor: 'b9eaff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            enableBody: true
        }
  
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);