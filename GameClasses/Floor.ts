module MINILD50
{
    export class Floor extends Phaser.Sprite
    {
        TopParts: Array<Phaser.Sprite>;

        constructor(game: Phaser.Game, x: number, y: number, skin: number, type: number)
        {
            this.TopParts = new Array<Phaser.Sprite>();
            var roofsize = "";
            var PossibleTopBits = 0;
            switch (type)
            {
                case 1:
                    roofsize = "128";
                    PossibleTopBits = 1;
                    break;
                case 2:
                    roofsize = "256";
                    PossibleTopBits = 2;
                    break;
                case 3:
                    roofsize = "512";
                    PossibleTopBits = 4;
                    break;
            }
            super(game, x, y, 'graphics-Level-BuildingParts-Roof' + roofsize + '-' + skin);

            for (var h = 0; h < PossibleTopBits; h++)
            {
                if (game.rnd.integerInRange(0, 100) < 75) continue;
                var topBit = new Phaser.Sprite(game, x + (128 * h), y - 64, 'graphics-Level-BuildingParts-Top-' + game.rnd.integerInRange(1, 5));
                game.add.existing(topBit);
                this.TopParts.push(topBit);
            }

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.immovable = true;

            (<Phaser.Physics.Arcade.Body>this.body).allowGravity = false;
        }
    }
}