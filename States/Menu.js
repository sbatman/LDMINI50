var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
        }
        MenuState.prototype.preload = function () {
        };

        MenuState.prototype.create = function () {
            this.titleMusic = this.add.audio('content-audio-music-titleScreenMusic', 0.05, true);
            this.titleMusic.play();

            this.background = this.add.sprite(0, 0, 'content-graphics-menu-titleScreen');
            this.background.alpha = 0;
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;

            this.prompt = this.game.add.text((window.innerWidth / 2) - 90, window.innerHeight / 2, "Click to Start", { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });
            this.prompt.alpha = 0;

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.prompt).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

            this.input.onDown.addOnce(this.fadeOut, this);
        };

        MenuState.prototype.fadeOut = function () {
            this.add.tween(this.prompt).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        };

        MenuState.prototype.startGame = function () {
            this.game.state.start('Level', true, false);

            this.titleMusic.stop();
        };
        return MenuState;
    })(Phaser.State);
    MINILD50.MenuState = MenuState;
})(MINILD50 || (MINILD50 = {}));
