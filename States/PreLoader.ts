module MINILD50
{
    export class PreloaderState extends Phaser.State
    {

        preload()
        {

            
            this.load.image('graphics-character-placeholder', 'Content/Graphics/Character/PlaceHolder.png');
        }

        create()
        {

            this.game.state.start('Level', true, false);

        }

    }

}