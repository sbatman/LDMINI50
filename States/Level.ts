module MINILD50
{
    export class LevelState extends Phaser.State
    {
        player: MINILD50.Player;
        Floor: Array<MINILD50.Floor>;
        GroupFloor: Phaser.Group;
        Background: Phaser.Sprite;
        Fadeout: Phaser.Sprite;
        ThemeMusic: Phaser.Sound;
        BackgroundCloudGenerator: MINILD50.Clouds;
        ForgroundCloudGenerator: MINILD50.Clouds;
        Score: number;
        HighScore: number;
        ScoreText: Phaser.Text;
        HighScoreText: Phaser.Text;
        PlayerOrigin: number;
        Difficulty: number;

        //this method will return the value of a cookie.
        readCookie(name :string)
        {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
        }

        preload()
        {
            this.Difficulty = 0;
            //play theme music.
            this.ThemeMusic = this.add.audio('content-audio-music-gameTheme', 0.2, true);
            this.ThemeMusic.play();

            //create the background and draw it as sky blue.
            this.Background = new Phaser.Sprite(this.game, 0, 0, 'content-graphics-level-background');
            this.Background.fixedToCamera = true;
            this.game.add.existing(this.Background);

            this.BackgroundCloudGenerator = new MINILD50.Clouds(this.game, 80, -5, 2);

            this.player = new Player(this.game, 10, 284);
            this.game.physics.arcade.gravity.y = 450;


            //create fadeout to mask half height of game
            this.Fadeout = new Phaser.Sprite(this.game, 0, 500, 'content-graphics-level-fadeOut');
            this.Fadeout.fixedToCamera = true;
            this.game.add.existing(this.Fadeout);
            this.ForgroundCloudGenerator = new MINILD50.Clouds(this.game, 25, 2, 5);

            this.makeWorld();


            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(200, 150, 500, 300);

            


            //add score
            this.Score = 0;
            this.ScoreText = this.game.add.text(10, 40, "Current Score:    " + this.Score.toString(), { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });
            this.ScoreText.fixedToCamera = true;


            //check cookie for highscore
            this.HighScore = parseFloat(this.readCookie('hiScore'));

            //sanity check
            if (isNaN(this.HighScore))
            {
                this.HighScore = 0;
            }
             
            this.HighScoreText = this.game.add.text(10, 10, "Best Score:         " + this.HighScore.toFixed(), { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });
            this.HighScoreText.fixedToCamera = true;

            //record player start pos
            this.PlayerOrigin = this.player.position.x;
        }

        create()
        {

        }

        update()
        {
            //if user presses escape go back to the main menu.
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC))
            {
                //reload the page
                location.reload();
            }

            this.BackgroundCloudGenerator.update();
            this.ForgroundCloudGenerator.update();
            this.game.physics.arcade.collide(this.player, this.GroupFloor);
            this.player.PhysicsUpdate();


            //update score
            if (this.player.position.x > this.PlayerOrigin)
            {
                this.Score += ((this.player.position.x - this.PlayerOrigin) / 100) * (1 + this.Difficulty);
                if (this.Score > this.HighScore)
                {
                    this.HighScore = this.Score;
                    this.HighScoreText.text = "Best Score:         " + this.HighScore.toFixed(0);

                    //save the high score as a cookie
                    document.cookie = "hiScore=" + this.HighScore + "; expires=Thu, 18 Dec 2099 12:00:00 GMT";
                }
                this.PlayerOrigin = this.player.position.x;

                this.ScoreText.text = "Current Score:    " + this.Score.toFixed(0);


            }

            if (this.player.position.y > 700)
            {
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                this.PlayerOrigin = 0;
                this.GroupFloor.removeAll();
                for (var x = 0; x < 120; x++)
                {
                    this.Floor[x].destroy();
                }
                this.Floor = null;
                this.GroupFloor = null;
                this.Difficulty = 0;
                this.Score = 0;
                this.makeWorld();
                this.ScoreText.text = this.Score.toFixed(0);
            }
            if (this.player.position.x > 20000)
            {
                this.Difficulty++;
                this.player.body.position.x = 30;
                this.player.body.position.y = 284;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                this.PlayerOrigin = 0;
                this.GroupFloor.removeAll();
                for (var x = 0; x < 120; x++)
                {
                    this.Floor[x].destroy();
                }
                this.Floor = null;
                this.GroupFloor = null;
                this.makeWorld();
            }
        }

        makeWorld()
        {

            var pos = 0;
            var lasheight = 360;
            this.GroupFloor = this.game.add.group();
            this.Floor = new Array<MINILD50.Floor>();
            for (var x = 0; x < 120; x++)
            {
                var type = this.rnd.integerInRange(1, 3);
                var newhieght = this.rnd.integerInRange(lasheight - (55 + this.Difficulty), lasheight + (55 + this.Difficulty));
                if (newhieght < 350) newhieght = 350;
                if (newhieght > 500) newhieght = 500;
                if (newhieght - lasheight > -4 && newhieght - lasheight < 4) newhieght += 12;
                lasheight = newhieght;
                var floor = new MINILD50.Floor(this.game, pos, newhieght, this.rnd.integerInRange(1, type == 3 ? 2 : 3), type);
                this.Floor.push(floor);
                this.GroupFloor.add(floor);
                pos += this.rnd.integerInRange(x + 5, (x * 2) + (this.Difficulty * 60));
                switch (type)
                {
                    case 1: pos += 128; break;
                    case 2: pos += 256; break;
                    case 3: pos += 512; break;
                }
            }
            this.Fadeout.bringToTop();
            this.ForgroundCloudGenerator.bringToTop();
        }

        exit()
        {
            this.player = null;
        }
    }
}