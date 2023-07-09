const gameState = {}

function preload() {
    // load all images for gameplay
    this.load.image('codey', './Images/codey.png');
    this.load.image('platform', './Images/platform.png');
};
function create() {

    // create static platform
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

    // create player
    gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

    // create collider between player and platform.
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);

};
function update() {
    
}

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