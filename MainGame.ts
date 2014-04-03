// ///////////////////////////
// /// MINILD50
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Edwin Jones (http://edwinjones.me.uk/)
// ///////////////////////////
module MINILD50
{
    export class MainGame extends Phaser.Game
        {

        constructor()
        {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            this.state.add('Boot', BootState, false);
            this.state.add('Preloader', PreloaderState, false);
            this.state.add('MainMenu', MenuState, false);
            this.state.add('Level', LevelState, false);

            this.state.start('Boot');
        }
        }
}