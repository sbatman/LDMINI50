module MINILD50
{
    export class PreloaderState extends Phaser.State
    {
        //reference to our preloading bar sprite.
        preloadBar: Phaser.Sprite;
        loadingMessage: Phaser.Text;

        preload()
        {
            //load all images.
            this.load.image('graphics-character-placeholder', 'Content/Graphics/Character/PlaceHolder.png');
            this.load.image('content-graphics-menu-titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
            this.load.image('content-graphics-level-fadeOut', 'Content/Graphics/Level/fadeOut.png');

            //Loading Buildings
            for (var i = 1; i <= 3; i++) this.load.image('graphics-Level-BuildingParts-Roof128-' + i, 'Content/Graphics/Level/BuildingParts/Roof128-' + i + '.png');
            for (var i = 1; i <= 3; i++) this.load.image('graphics-Level-BuildingParts-Roof256-' + i, 'Content/Graphics/Level/BuildingParts/Roof256-' + i + '.png');
            for (var i = 1; i <= 2; i++) this.load.image('graphics-Level-BuildingParts-Roof512-' + i, 'Content/Graphics/Level/BuildingParts/Roof512-' + i + '.png');
            for (var i = 1; i <= 5; i++) this.load.image('graphics-Level-BuildingParts-Top-' + i, 'Content/Graphics/Level/BuildingParts/Top-' + i + '.png');

            this.load.image('content-graphics-level-background', 'Content/Graphics/Level/Background.jpg');
            for (var i = 1; i <= 2; i++) this.load.image('content-graphics-level-Clouds-'+i, 'Content/Graphics/Level/Clouds/'+i+'.png');


            //load all audio
            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');
            this.load.audio('content-audio-music-gameTheme', 'Content/Audio/Music/gameTheme.mp3');

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite((window.innerWidth / 2) - 200, (window.innerHeight / 2) - 20, 'content-graphics-menu-loadingBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.loadingMessage = this.game.add.text((window.innerWidth / 2) - 50, (window.innerHeight / 2) - 100, "Loading", { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });;
        }


        create()
        {
            //allow the loading bar to animate as assets load, and switch to the main menu game state when loading completes.
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        //switch to the main menu state at this point.
        startMainMenu()
        {
            this.game.state.start('MainMenu', true, false);
        }
    }
}