var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var LevelState = (function (_super) {
        __extends(LevelState, _super);
        function LevelState() {
            _super.apply(this, arguments);
        }
        LevelState.prototype.preload = function () {
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.5, true);
            this.ThemeMusic.play();

            this.Background = this.game.add.graphics(0, 0);
            this.Background.beginFill(0x87CEEB, 1);
            this.Background.drawRect(0, 0, window.innerWidth, window.innerHeight);

            this.player = new MINILD50.Player(this.game, 10, 284);
            this.game.physics.arcade.gravity.y = 250;
            this.GroupFloor = this.game.add.group();

            this.Floor = new Array();

            var pos = 0;
            for (var x = 0; x < 10; x++) {
                var floor = new MINILD50.Floor(this.game, pos, this.rnd.integerInRange(350, 420));
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += this.rnd.integerInRange(0, 100);
                pos += 128;
            }
        };

        LevelState.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();
            if (this.player.position.y > 700) {
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
        };

        LevelState.prototype.exit = function () {
            this.player = null;
        };
        return LevelState;
    })(Phaser.State);
    MINILD50.LevelState = LevelState;
})(MINILD50 || (MINILD50 = {}));
