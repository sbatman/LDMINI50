﻿class MainGame
{
    game: Phaser.Game;

    constructor()
    {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    preload() {
        this.game.load.image("TestImage", "Content/Graphics/TestImage.png");
    }
    create() {
        this.game.stage.backgroundColor = "#ffffff";
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "TestImage");
        logo.anchor.setTo(0.5, 0.5);
    }
}



window.onload = () => {
    var instanceOfGame = new MainGame();
};