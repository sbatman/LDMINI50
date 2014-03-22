window.onload = function () {
    var instanceOfGame = new MINILD50.MainGame();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MINILD50;
(function (MINILD50) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.call(this, screen.availWidth, screen.availHeight - 100, Phaser.AUTO, 'content', null);

            this.state.add('Boot', MINILD50.BootState, false);
            this.state.add('Preloader', MINILD50.PreloaderState, false);
            this.state.add('MainMenu', MINILD50.MenuState, false);

            this.state.start('Preloader');
        }
        return MainGame;
    })(Phaser.Game);
    MINILD50.MainGame = MainGame;
})(MINILD50 || (MINILD50 = {}));
var MINILD50;
(function (MINILD50) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
        }
        MenuState.prototype.preload = function () {
            //Load audio in.
            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');

            //load graphics in.
            this.load.image('titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
        };

        MenuState.prototype.create = function () {
            //play title music.
            this.titleMusic = this.add.audio('content-audio-music-titleScreenMusic', 1, true);
            this.titleMusic.play();

            this.background = this.add.sprite(0, 0, 'titleScreen');
            this.background.alpha = 0;

            this.prompt = this.game.add.text((this.camera.width / 2) - 100, this.camera.height / 2, "Press Enter to Start", { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });

            //add animations
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

            //this.add.tween(this.prompt).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //put event handler on user input to load the game fully when the user clicks a button.
            this.input.onDown.addOnce(this.fadeOut, this);
        };

        //when user provides input, fade the menu screen out and load the first level.
        MenuState.prototype.fadeOut = function () {
            //delete text prompt
            this.prompt = null;

            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };

        //load the first level - atm we dont have one so just loop back to the loading bar state.
        MenuState.prototype.startGame = function () {
            this.game.state.start('Preloader', true, false);

            //stop music and delete assets
            this.titleMusic.stop();
            this.titleMusic = null;
            this.background = null;
        };
        return MenuState;
    })(Phaser.State);
    MINILD50.MenuState = MenuState;
})(MINILD50 || (MINILD50 = {}));
var MINILD50;
(function (MINILD50) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            _super.apply(this, arguments);
        }
        PreloaderState.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loadingBar.jpg');
            this.preloadBar = this.add.sprite(200, 250, 'content-graphics-menu-loadingBar');
            this.load.setPreloadSprite(this.preloadBar);
        };

        PreloaderState.prototype.create = function () {
            //allow the loading bar to animate as assets load, and switch to the main menu game state when loading completes.
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        //switch to the main menu state at this point.
        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return PreloaderState;
    })(Phaser.State);
    MINILD50.PreloaderState = PreloaderState;
})(MINILD50 || (MINILD50 = {}));
var MINILD50;
(function (MINILD50) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            _super.apply(this, arguments);
        }
        BootState.prototype.preload = function () {
        };

        BootState.prototype.create = function () {
            //  this.game.state.start('Preloader', true, false);
        };
        return BootState;
    })(Phaser.State);
    MINILD50.BootState = BootState;
})(MINILD50 || (MINILD50 = {}));
//# sourceMappingURL=MainGame.js.map
