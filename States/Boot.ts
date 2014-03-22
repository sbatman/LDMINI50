module MINILD50
{
    export class BootState extends Phaser.State
    {

        preload()
        {
            //load the loading bar BEFORE the main loading phase.
            this.load.image('content-graphics-menu-loadingBar', 'Content/Graphics/Menu/loadingBar.jpg');
        }

        create()
        {
          this.game.state.start('Preloader', true, false);
        }

    }

}