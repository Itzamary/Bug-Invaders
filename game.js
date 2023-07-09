function preload() {};
function create() {};
function update() {}

const config = {
    type: Phaser.AUTO,
    width: 350,
    height: 200, 
    backgroundColor: 'b9eaff',
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);