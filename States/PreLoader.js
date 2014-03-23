var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            _super.apply(this, arguments);
        }
        PreloaderState.prototype.preload = function () {
            this.load.image('graphics-character-placeholder', 'Content/Graphics/Character/PlaceHolder.png');
            this.load.image('content-graphics-menu-titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
            this.load.image('graphics-Level-BuildingParts-Roof128-1', 'Content/Graphics/Level/BuildingParts/Roof128-1.png');

            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');
            this.load.audio('content-audio-music-gameTheme', 'Content/Audio/Music/gameTheme.mp3');

            this.preloadBar = this.add.sprite((window.innerWidth / 2) - 200, (window.innerHeight / 2) - 20, 'content-graphics-menu-loadingBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.loadingMessage = this.game.add.text((window.innerWidth / 2) - 50, (window.innerHeight / 2) - 100, "Loading", { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });
            ;
        };

        PreloaderState.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return PreloaderState;
    })(Phaser.State);
    MINILD50.PreloaderState = PreloaderState;
})(MINILD50 || (MINILD50 = {}));
