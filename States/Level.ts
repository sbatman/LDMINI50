module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;
        Floor: Array<MINILD50.Floor>;
        GroupFloor: Phaser.Group;
        Background: Phaser.Sprite;
        ThemeMusic: Phaser.Sound;
        CloudGenerator: MINILD50.Clouds;

        preload()
        {
            //play theme music.
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.5, true);
            this.ThemeMusic.play();

            //create the background and draw it as sky blue.
            this.Background = new Phaser.Sprite(this.game,0,0,'content-graphics-level-background');
            this.Background.fixedToCamera = true;
            this.game.add.existing(this.Background);


            this.CloudGenerator = new MINILD50.Clouds(this.game);


            this.player = new Player(this.game, 10, 284);
            this.game.physics.arcade.gravity.y = 250;
            this.GroupFloor = this.game.add.group();          

            this.Floor = new Array<MINILD50.Floor>();

            var pos = 0;
            for (var x = 0; x < 50; x++)
            {
                          
                var floor = new MINILD50.Floor(this.game, pos, this.rnd.integerInRange(350, 420+(x*3)), this.rnd.integerInRange(1, 3));
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += this.rnd.integerInRange(x * 3, 40+(x*3)); 
                pos += 128;
            }
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(200, 150, 500, 300);

        }

        create()
        {

        }

        update()
        {
            this.CloudGenerator.update();
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();
            if (this.player.position.y > 700)
            {
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
        }

        exit()
        {
            this.player = null;
        }
    }
}