module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;

        preload()
        {

           
           
        }

        create()
        {
            this.player = new Player(this.game, 130, 284);
          //  this.game.state.start('Preloader', true, false);

        }

    }

}