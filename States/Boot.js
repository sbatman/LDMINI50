var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            _super.apply(this, arguments);
        }
        BootState.prototype.preload = function () {
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loader.jpg');
        };

        BootState.prototype.create = function () {
            this.game.state.start('Preloader', true, false);
        };
        return BootState;
    })(Phaser.State);
    MINILD50.BootState = BootState;
})(MINILD50 || (MINILD50 = {}));
