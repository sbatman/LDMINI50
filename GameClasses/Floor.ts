module MINILD50
{
    export class Floor extends Phaser.Sprite
    {
        constructor(game: Phaser.Game, x: number, y: number, type: number)
        {            
            super(game, x, y, 'graphics-Level-BuildingParts-Roof128-' + type);            
       
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;
            
            (<Phaser.Physics.Arcade.Body>this.body).allowGravity = false;
        }      
    }
}