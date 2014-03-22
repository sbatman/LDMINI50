var MINILD50;
(function (MINILD50) {
    var MainGame = (function () {
        function MainGame() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        }
        MainGame.prototype.preload = function () {
            this.game.load.image("TestImage", "Content/Graphics/TestImage.png");
        };
        MainGame.prototype.create = function () {
            this.game.stage.backgroundColor = "#ffffff";
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "TestImage");
            logo.anchor.setTo(0.5, 0.5);
        };
        return MainGame;
    })();
})(MINILD50 || (MINILD50 = {}));

window.onload = function () {
    var instanceOfGame = new MainGame();
};
//# sourceMappingURL=app.js.map
