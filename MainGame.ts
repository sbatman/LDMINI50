﻿module MINILD50
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