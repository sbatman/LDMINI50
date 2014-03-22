var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
        };

        Boot.prototype.create = function () {
            //  this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    MINILD50.Boot = Boot;
})(MINILD50 || (MINILD50 = {}));
//# sourceMappingURL=Boot.js.map
