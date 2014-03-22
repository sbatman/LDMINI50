module MINILD50
{
    export class BootState extends Phaser.State
    {

        preload()
        {

          
            
        }

        create()
        {

            this.game.state.start('Preloader', true, false);

        }

    }

}