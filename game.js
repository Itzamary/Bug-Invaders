const gameState = {
    active: true
}

function preload() {
    // load all images for gameplay
    this.load.image('codey', './Images/codey.png');
    this.load.image('platform', './Images/platform.png');
};
function create() {

    // if gameState is not active than restart the scene on pointerup
    if (gameState.active === false) {
        this.input.on('pointerup', () => {
          this.scene.restart();
        })
    };


    // create static platform
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

    // create player
    gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

    // create collider between player and platform.
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);

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