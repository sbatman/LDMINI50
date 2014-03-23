﻿window.onload = function () {
    var instanceOfGame = new MINILD50.MainGame();
};
var MINILD50;
(function (MINILD50) {
    var Clouds = (function () {
        function Clouds(game, count, lowerVariance, upperVariance) {
            this.sprites = new Array();
            for (var i = 0; i < count; i++) {
                var instance = new Phaser.Sprite(game, -20000, 0, 'content-graphics-level-Clouds-' + ((i % 2) + 1));
                game.add.existing(instance);
                this.sprites.push(instance);
                instance.position.x = instance.game.rnd.integerInRange(-300, 20000);
                instance.position.y = instance.game.rnd.integerInRange(-100, 320);
                instance.scale.x = 1 - (0.1 * instance.game.rnd.integerInRange(-lowerVariance, upperVariance));
                instance.scale.y = instance.scale.x;
                instance.alpha = ((instance.scale.x - 0.5) * 0.5) + 0.5;
            }
        }
        Clouds.prototype.update = function () {
            for (var i = 0; i < this.sprites.length; i++) {
                this.sprites[i].position.x -= this.sprites[i].scale.x;
                if (this.sprites[i].position.x < -600) {
                    this.sprites[i].position.x = 20000 + this.sprites[i].game.rnd.integerInRange(0, 200);
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
        function Floor(game, x, y, skin, type) {
            this.TopParts = new Array();
            var roofsize = "";
            var PossibleTopBits = 0;
            switch (type) {
                case 1:
                    roofsize = "128";
                    PossibleTopBits = 1;
                    break;
                case 2:
                    roofsize = "256";
                    PossibleTopBits = 2;
                    break;
                case 3:
                    roofsize = "512";
                    PossibleTopBits = 4;
                    break;
            }
            _super.call(this, game, x, y, 'graphics-Level-BuildingParts-Roof' + roofsize + '-' + skin);

            for (var h = 0; h < PossibleTopBits; h++) {
                if (game.rnd.integerInRange(0, 100) < 75)
                    continue;
                var topBit = new Phaser.Sprite(game, x + (128 * h), y - 64, 'graphics-Level-BuildingParts-Top-' + game.rnd.integerInRange(1, 5));
                game.add.existing(topBit);
                this.TopParts.push(topBit);
                //  this.addChild(topBit);
            }

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;

            this.body.allowGravity = false;
        }
        Floor.prototype.destroy = function () {
            for (var i = 0; i < this.TopParts.length; i++)
                this.TopParts[i].destroy();
        };
        return Floor;
    })(Phaser.Sprite);
    MINILD50.Floor = Floor;
})(MINILD50 || (MINILD50 = {}));
var MINILD50;
(function (MINILD50) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'content-graphics-character-faithSpriteSheet', 0);
            this.anchor.setTo(0.5, 0);

            this.animations.add('walk', [0, 1], 5, true);

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.cursors = game.input.keyboard.createCursorKeys();
        }
        Player.prototype.PhysicsUpdate = function () {
            this.game.camera.x = this.body.position.x;

            //calculate animation speed.
            var speed = Math.abs(this.body.velocity.x) / 5;

            if (speed < 5)
                speed = 5;
            if (speed > 10)
                speed = 10;

            this.animations.getAnimation('walk').speed = speed;

            if (this.body.touching.down) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x -= 3;
                    this.animations.play('walk');

                    if (this.scale.x == 1)
                        this.scale.x = -1;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x += 3;
                    this.animations.play('walk');
                    if (this.scale.x == -1)
                        this.scale.x = 1;
                } else {
                    this.animations.frame = 0;
                    this.body.velocity.x *= 0.6;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -290;
                }
            } else {
                this.animations.frame = 1;
            }

            this.body.checkCollision.left = true;
            this.body.checkCollision.right = true;
            if (this.body.touching.right) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -290;
                    this.body.velocity.x = -this.body.velocity.x;
                    this.body.velocity.x -= 50;
                }
            } else if (this.body.touching.left) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -290;
                    this.body.velocity.x = -this.body.velocity.x;
                    this.body.velocity.x += 50;
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
            _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
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
            this.titleMusic = this.add.audio('content-audio-music-menuTheme', 0.1, true);
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
        //this method will return the value of a cookie.
        LevelState.prototype.readCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0)
                    return c.substring(nameEQ.length, c.length);
            }

            return null;
        };

        LevelState.prototype.preload = function () {
            this.Difficulty = 0;

            //play theme music.
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.2, true);
            this.ThemeMusic.play();

            //create the background and draw it as sky blue.
            this.Background = new Phaser.Sprite(this.game, 0, 0, 'content-graphics-level-background');
            this.Background.fixedToCamera = true;
            this.game.add.existing(this.Background);

            this.BackgroundCloudGenerator = new MINILD50.Clouds(this.game, 80, -5, 2);

            this.player = new MINILD50.Player(this.game, 10, 284);
            this.game.physics.arcade.gravity.y = 450;

            //create fadeout to mask half height of game
            this.Fadeout = new Phaser.Sprite(this.game, 0, 500, 'content-graphics-level-fadeOut');
            this.Fadeout.fixedToCamera = true;
            this.game.add.existing(this.Fadeout);

            this.makeWorld();

            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(200, 150, 500, 300);

            this.ForgroundCloudGenerator = new MINILD50.Clouds(this.game, 25, 2, 5);

            //add score
            this.Score = 0;
            this.ScoreText = this.game.add.text(10, 40, "Current Score:    " + this.Score.toString(), { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });
            this.ScoreText.fixedToCamera = true;

            //check cookie for highscore
            this.HighScore = parseFloat(this.readCookie('hiScore'));

            //sanity check
            if (isNaN(this.HighScore)) {
                this.HighScore = 0;
            }

            this.HighScoreText = this.game.add.text(10, 10, "Best Score:         " + this.HighScore.toFixed(), { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });
            this.HighScoreText.fixedToCamera = true;

            //record player start pos
            this.PlayerOrigin = this.player.position.x;
        };

        LevelState.prototype.create = function () {
        };

        LevelState.prototype.update = function () {
            //if user presses escape go back to the main menu.
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                //reload the page
                location.reload();
            }

            this.BackgroundCloudGenerator.update();
            this.ForgroundCloudGenerator.update();
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();

            //update score
            if (this.player.position.x > this.PlayerOrigin) {
                this.Score += ((this.player.position.x - this.PlayerOrigin) / 100) * (1 + this.Difficulty);
                if (this.Score > this.HighScore) {
                    this.HighScore = this.Score;
                    this.HighScoreText.text = "Best Score:         " + this.HighScore.toFixed(0);

                    //save the high score as a cookie
                    document.cookie = "hiScore=" + this.HighScore + "; expires=Thu, 18 Dec 2099 12:00:00 GMT";
                }
                this.PlayerOrigin = this.player.position.x;

                this.ScoreText.text = "Current Score:    " + this.Score.toFixed(0);
            }

            if (this.player.position.y > 700) {
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                this.PlayerOrigin = 0;
                this.GroupFloor.removeAll();
                for (var x = 0; x < 120; x++) {
                    this.Floor[x].destroy();
                }
                this.Floor = null;
                this.GroupFloor = null;
                this.Difficulty = 0;
                this.Score = 0;
                this.makeWorld();
                this.ScoreText.text = this.Score.toFixed(0);
            }
            if (this.player.position.x > 20000) {
                this.Difficulty++;
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                this.PlayerOrigin = 0;
                this.GroupFloor.removeAll();
                for (var x = 0; x < 120; x++) {
                    this.Floor[x].destroy();
                }
                this.Floor = null;
                this.GroupFloor = null;
                this.makeWorld();
            }
        };

        LevelState.prototype.makeWorld = function () {
            var pos = 0;
            var lasheight = 360;
            this.GroupFloor = this.game.add.group();
            this.Floor = new Array();
            for (var x = 0; x < 120; x++) {
                var type = this.rnd.integerInRange(1, 3);
                var newhieght = this.rnd.integerInRange(lasheight - (55 + this.Difficulty), lasheight + (55 + this.Difficulty));
                if (newhieght < 350)
                    newhieght = 350;
                if (newhieght > 500)
                    newhieght = 500;
                if (newhieght - lasheight > -4 && newhieght - lasheight < 4)
                    newhieght += 12;
                lasheight = newhieght;
                var floor = new MINILD50.Floor(this.game, pos, newhieght, this.rnd.integerInRange(1, type == 3 ? 2 : 3), type);
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += this.rnd.integerInRange(x + 5, (x * 2) + (this.Difficulty * 60));
                switch (type) {
                    case 1:
                        pos += 128;
                        break;
                    case 2:
                        pos += 256;
                        break;
                    case 3:
                        pos += 512;
                        break;
                }
            }
            this.Fadeout.bringToTop();
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
            this.load.image('content-graphics-menu-titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
            this.load.image('content-graphics-level-fadeOut', 'Content/Graphics/Level/fadeOut.png');

            //load spritesheets
            this.load.spritesheet('content-graphics-character-faithSpriteSheet', 'Content/Graphics/Character/faithSpriteSheet.png', 30, 40, 2);

            for (var i = 1; i <= 3; i++)
                this.load.image('graphics-Level-BuildingParts-Roof128-' + i, 'Content/Graphics/Level/BuildingParts/Roof128-' + i + '.jpg');
            for (var i = 1; i <= 3; i++)
                this.load.image('graphics-Level-BuildingParts-Roof256-' + i, 'Content/Graphics/Level/BuildingParts/Roof256-' + i + '.jpg');
            for (var i = 1; i <= 2; i++)
                this.load.image('graphics-Level-BuildingParts-Roof512-' + i, 'Content/Graphics/Level/BuildingParts/Roof512-' + i + '.jpg');
            for (var i = 1; i <= 5; i++)
                this.load.image('graphics-Level-BuildingParts-Top-' + i, 'Content/Graphics/Level/BuildingParts/Top-' + i + '.png');

            this.load.image('content-graphics-level-background', 'Content/Graphics/Level/Background.jpg');
            for (var i = 1; i <= 2; i++)
                this.load.image('content-graphics-level-Clouds-' + i, 'Content/Graphics/Level/Clouds/' + i + '.png');

            //load all audio
            this.load.audio('content-audio-music-gameTheme', 'Content/Audio/Music/Track.mp3');
            this.load.audio('content-audio-music-menuTheme', 'Content/Audio/Music/MenuTrack.mp3');

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
            this.game.world.width = 20000;
            this.game.camera.bounds.width = 20000;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start('Preloader', true, false);
        };
        return BootState;
    })(Phaser.State);
    MINILD50.BootState = BootState;
})(MINILD50 || (MINILD50 = {}));
