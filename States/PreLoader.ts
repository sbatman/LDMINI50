module MINILD50
{
    export class PreloaderState extends Phaser.State
    {
        //reference to our preloading bar sprite.
        preloadBar: Phaser.Sprite;

        preload()
        {
            //  Set-up our preloader sprite
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loadingBar.jpg');

            this.preloadBar = this.add.sprite(200, 250, 'content-graphics-menu-loadingBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('graphics-character-placeholder', 'Content/Graphics/Character/PlaceHolder.png');
            this.load.image('graphics-Level-BuildingParts-Floor64', 'Content/Graphics/Level/BuildingParts/Floor64.png');
            
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