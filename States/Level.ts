module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;
        Floor: Array<MINILD50.Floor>;
        GroupFloor: Phaser.Group;
        Background: Phaser.Graphics;

        preload()
        {
            //create the background and draw it as sky blue.
            this.Background = this.game.add.graphics(0, 0);
            this.Background.beginFill(0x87CEEB, 1)
            this.Background.drawRect(0, 0, window.innerWidth, window.innerHeight);

            this.player = new Player(this.game, 130, 284);

            this.GroupFloor = this.game.add.group();

            this.Floor = new Array<MINILD50.Floor>();

            for (var x = 0; x < 10; x++)
            {
                var floor = new MINILD50.Floor(this.game, x * 64, 350);
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
            }
            for (var x = 0; x < 10; x++)
            {
                var floor  = new MINILD50.Floor(this.game, (x + 10) * 64, 390);
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
            }

            this.game.physics.arcade.collide(this.player, this.GroupFloor);
        }

        Update()
        {
            this.player.body.velocity.x++;
        }

        exit()
        {
            this.player = null;
        }
    }
}