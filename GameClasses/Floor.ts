module MINILD50
{
    export class Floor extends Phaser.Sprite
    {
        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'graphics-Level-BuildingParts-Floor64');            
            this.anchor.setTo(0.5, 0);          
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;
            
            (<Phaser.Physics.Arcade.Body>this.body).allowGravity = false;
        }      
    }
}