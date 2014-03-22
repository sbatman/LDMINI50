module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;
        Floor: Array<MINILD50.Floor>;
        GroupFloor: Phaser.Group;
        Background: Phaser.Graphics;
        ThemeMusic: Phaser.Sound;

        preload()
        {
            //create the background and draw it as sky blue.
            this.Background = this.game.add.graphics(0, 0);
            this.Background.beginFill(0x87CEEB, 1)
            this.Background.drawRect(0, 0, window.innerWidth, window.innerHeight);


            //play theme music.
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.5, true);
            this.ThemeMusic.play();

            this.player = new Player(this.game, 10, 284);

            this.game.physics.arcade.gravity.y = 250;
            this.GroupFloor = this.game.add.group();

            

            this.Floor = new Array<MINILD50.Floor>();

            var pos = 0;
            for (var x = 0; x < 10; x++)
            {
                pos += this.rnd.integerInRange(0, 100);           
                var floor = new MINILD50.Floor(this.game, pos, this.rnd.integerInRange(350, 420));
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += 128;
            }

            
        }

        update()
        {
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();
            this.game.camera.follow(this.player);
        }

        exit()
        {
            this.player = null;
            this.ThemeMusic.stop();
        }
    }
}