module MINILD50
{
    export class Clouds
    {
        sprites: Array<Phaser.Sprite>;

        constructor(game: Phaser.Game, count: number, lowerVariance: number, upperVariance: number)
        {
            this.sprites = new Array<Phaser.Sprite>();
            for (var i = 0; i < count; i++)
            {
                var instance = new Phaser.Sprite(game, -20000, 0, 'content-graphics-level-Clouds-' + ((i % 2) + 1));
                game.add.existing(instance);
                this.sprites.push(instance);
                instance.position.x = instance.game.rnd.integerInRange(-300, 20000);
                instance.position.y = instance.game.rnd.integerInRange(-100, 320);
                instance.scale.x = 1 - (0.1 * instance.game.rnd.integerInRange(-lowerVariance, upperVariance));
                instance.scale.y = instance.scale.x;
                instance.alpha = ((instance.scale.x - 0.5) * 0.5) + 0.5;
            }
        }

        update()
        {
            for (var i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].position.x -= this.sprites[i].scale.x;
                if (this.sprites[i].position.x < -600)
                {
                    this.sprites[i].position.x = 20000 + this.sprites[i].game.rnd.integerInRange(0, 200);
                    this.sprites[i].position.y = this.sprites[i].game.rnd.integerInRange(-50, 320);
                }
            }
        }

        bringToTop()
        {
            for (var i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].bringToTop();
            }
        }

    }
}