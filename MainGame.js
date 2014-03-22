window.onload = function () {
    var instanceOfGame = new MINILD50.MainGame();
};
var MINILD50;
(function (MINILD50) {
    var Clouds = (function () {
        function Clouds(game) {
            this.sprites = new Array();
            for (var i = 0; i < 30; i++) {
                var instance = new Phaser.Sprite(game, -10000, 0, 'content-graphics-level-Clouds-' + ((i % 2) + 1));
                game.add.existing(instance);
                this.sprites.push(instance);
                instance.position.x = instance.game.rnd.integerInRange(-300, 10000);
                instance.position.y = instance.game.rnd.integerInRange(-100, 320);
                instance.scale.x = 1 - (0.1 * instance.game.rnd.integerInRange(-5, 5));
                instance.scale.y = instance.scale.x;
                instance.alpha = ((instance.scale.x - 0.5) * 0.5) + 0.5;
            }
        }
        Clouds.prototype.update = function () {
            for (var i = 0; i < this.sprites.length; i++) {
                this.sprites[i].position.x -= this.sprites[i].scale.x;
                if (this.sprites[i].position.x < -600) {
                    this.sprites[i].position.x = 10000 + this.sprites[i].game.rnd.integerInRange(0, 200);
                    this.sprites[i].position.y = this.sprites[i].game.rnd.integerInRange(-50, 320);
                }
            }
        };
        return Clouds;
    })();
    MINILD50.Clouds = Clouds;
})(MINILD50 || (MINILD50 = {}));
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
        function Floor(game, x, y, type) {
            _super.call(this, game, x, y, 'graphics-Level-BuildingParts-Roof128-' + type);

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;

            this.body.allowGravity = false;
        }
        return Floor;
    })(Phaser.Sprite);
    MINILD50.Floor = Floor;
})(MINILD50 || (MINILD50 = {}));
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
            this.cursors = game.input.keyboard.createCursorKeys();
        }
        Player.prototype.PhysicsUpdate = function () {
            this.game.camera.x = this.body.position.x;
            if (this.body.touching.down) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x -= 5;
                    if (this.scale.x == 1) {
                        this.scale.x = -1;
                    }
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x += 5;
                    if (this.scale.x == -1) {
                        this.scale.x = 1;
                    }
                } else {
                    this.body.velocity.x *= 0.6;
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
var MINILD50;
(function (MINILD50) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.call(this, window.innerWidth, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', MINILD50.BootState, false);
            this.state.add('Preloader', MINILD50.PreloaderState, false);
            this.state.add('MainMenu', MINILD50.MenuState, false);
            this.state.add('Level', MINILD50.LevelState, false);

            this.state.start('Boot');
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
        };

        MenuState.prototype.create = function () {
            //play title music.
            this.titleMusic = this.add.audio('content-audio-music-titleScreenMusic', 0.05, true);
            this.titleMusic.play();

            this.background = this.add.sprite(0, 0, 'content-graphics-menu-titleScreen');
            this.background.alpha = 0;
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;

            this.prompt = this.game.add.text((window.innerWidth / 2) - 90, window.innerHeight / 2, "Click to Start", { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });
            this.prompt.alpha = 0;

            //add animations
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.prompt).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

            //put event handler on user input to load the game fully when the user clicks a button.
            this.input.onDown.addOnce(this.fadeOut, this);
        };

        //when user provides input, fade the menu screen out and load the first level.
        MenuState.prototype.fadeOut = function () {
            this.add.tween(this.prompt).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        };

        //load the first level
        MenuState.prototype.startGame = function () {
            this.game.state.start('Level', true, false);

            //stop music
            this.titleMusic.stop();
        };
        return MenuState;
    })(Phaser.State);
    MINILD50.MenuState = MenuState;
})(MINILD50 || (MINILD50 = {}));
var MINILD50;
(function (MINILD50) {
    var LevelState = (function (_super) {
        __extends(LevelState, _super);
        function LevelState() {
            _super.apply(this, arguments);
        }
        LevelState.prototype.preload = function () {
            //play theme music.
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.5, true);
            this.ThemeMusic.play();

            //create the background and draw it as sky blue.
            this.Background = new Phaser.Sprite(this.game, 0, 0, 'content-graphics-level-background');
            this.Background.fixedToCamera = true;
            this.game.add.existing(this.Background);

            this.CloudGenerator = new MINILD50.Clouds(this.game);

            this.player = new MINILD50.Player(this.game, 10, 284);
            this.game.physics.arcade.gravity.y = 250;
            this.GroupFloor = this.game.add.group();

            this.Floor = new Array();

            var pos = 0;
            for (var x = 0; x < 50; x++) {
                var floor = new MINILD50.Floor(this.game, pos, this.rnd.integerInRange(350, 420 + (x * 3)), this.rnd.integerInRange(1, 3));
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += this.rnd.integerInRange(x * 3, 40 + (x * 3));
                pos += 128;
            }
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(200, 150, 500, 300);
        };

        LevelState.prototype.create = function () {
        };

        LevelState.prototype.update = function () {
            this.CloudGenerator.update();
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
var MINILD50;
(function (MINILD50) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            _super.apply(this, arguments);
        }
        PreloaderState.prototype.preload = function () {
            //load all images.
            this.load.image('graphics-character-placeholder', 'Content/Graphics/Character/PlaceHolder.png');
            this.load.image('content-graphics-menu-titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
            for (var i = 1; i <= 3; i++)
                this.load.image('graphics-Level-BuildingParts-Roof128-' + i, 'Content/Graphics/Level/BuildingParts/Roof128-' + i + '.png');
            this.load.image('content-graphics-level-background', 'Content/Graphics/Level/Background.jpg');
            for (var i = 1; i <= 2; i++)
                this.load.image('content-graphics-level-Clouds-' + i, 'Content/Graphics/Level/Clouds/' + i + '.png');

            //load all audio
            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');
            this.load.audio('content-audio-music-gameTheme', 'Content/Audio/Music/gameTheme.mp3');

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite((window.innerWidth / 2) - 200, (window.innerHeight / 2) - 20, 'content-graphics-menu-loadingBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.loadingMessage = this.game.add.text((window.innerWidth / 2) - 50, (window.innerHeight / 2) - 100, "Loading", { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });
            ;
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
            //load the loading bar BEFORE the main loading phase.
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loader.jpg');
        };

        BootState.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.world.width = 10000;
            this.game.camera.bounds.width = 10000;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start('Preloader', true, false);
        };
        return BootState;
    })(Phaser.State);
    MINILD50.BootState = BootState;
})(MINILD50 || (MINILD50 = {}));
