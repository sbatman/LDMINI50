module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;
        Floor: Array<MINILD50.Floor>;
        GroupFloor: Phaser.Group;

        preload()
        {
            this.player = new Player(this.game, 130, 284);
            this.game.physics.arcade.gravity.y = 250;
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

            
        }

        update()
        {
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();
            this.game.debug.body(this.player);

        }

        exit()
        {
            this.player = null;
        }
    }
}