module MINILD50
{
    export class Player extends Phaser.Sprite
    {
        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'graphics-character-placeholder');            
            this.anchor.setTo(0.5, 0);          
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.gravity.y = 6;
        }

        update()
        {
            
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.body.velocity.x = -150;
                if (this.scale.x == 1)
                {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.body.velocity.x = 150;
                if (this.scale.x == -1)
                {
                    this.scale.x = 1;
                }
            }
        }
    }
}