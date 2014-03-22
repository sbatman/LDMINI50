var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.preload = function () {
        };

        Menu.prototype.create = function () {
            //  this.game.state.start('Preloader', true, false);
        };
        return Menu;
    })(Phaser.State);
    MINILD50.Menu = Menu;
})(MINILD50 || (MINILD50 = {}));
//# sourceMappingURL=PreLoader.js.map
