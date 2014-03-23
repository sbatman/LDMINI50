var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor(game, x, y) {
            _super.call(this, game, x, y, 'graphics-Level-BuildingParts-Roof128-1');

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;

            this.body.allowGravity = false;
        }
        return Floor;
    })(Phaser.Sprite);
    MINILD50.Floor = Floor;
})(MINILD50 || (MINILD50 = {}));
