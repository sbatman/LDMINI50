module MINILD50
{
    export class BootState extends Phaser.State
    {

        preload()
        {
            //load the loading bar BEFORE the main loading phase.
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loader.jpg');
        }

        create()
        {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.world.width = 10000;
            this.game.camera.bounds.width = 10000;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start('Preloader', true, false);

        }

    }

}