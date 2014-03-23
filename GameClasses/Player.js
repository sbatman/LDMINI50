var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'graphics-character-placeholder');
            this.anchor.setTo(0.5, 0);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
        }
        Player.prototype.PhysicsUpdate = function () {
            if (this.body.touching.down) {
                this.body.velocity.x *= 0.95;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x = -150;
                    if (this.scale.x == 1) {
                        this.scale.x = -1;
                    }
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x = 150;
                    if (this.scale.x == -1) {
                        this.scale.x = 1;
                    }
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -190;
                }
            }
        };
        return Player;
    })(Phaser.Sprite);
    MINILD50.Player = Player;
})(MINILD50 || (MINILD50 = {}));
