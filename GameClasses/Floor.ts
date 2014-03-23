module MINILD50
{
    export class Floor extends Phaser.Sprite
    {
        constructor(game: Phaser.Game, x: number, y: number, skin: number, type: number)
        {
            var roofsize = "";
            switch (type)
            {
                case 1: roofsize = "128"; break;
                case 2: roofsize = "256"; break;
                case 3: roofsize = "512"; break;
            }
            super(game, x, y, 'graphics-Level-BuildingParts-Roof' + roofsize + '-' + skin);

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;

            (<Phaser.Physics.Arcade.Body>this.body).allowGravity = false;
        }
    }
}