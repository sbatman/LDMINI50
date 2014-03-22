module MINILD50
{
    export class MainGame extends Phaser.Game
    {
        constructor()
        {
            super(screen.availWidth, screen.availHeight-100, Phaser.AUTO, 'content', null);
        }
    }
}