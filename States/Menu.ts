module MINILD50
{
    export class MenuState extends Phaser.State
    {
        //references
        titleMusic: Phaser.Sound;
        background: Phaser.Sprite;
        prompt:     Phaser.Text;


        preload()
        {

        }

        create()
        {
            //play title music.
            this.titleMusic = this.add.audio('content-audio-music-menuTheme', 0.1, true);
            this.titleMusic.play();

            this.background = this.add.sprite(0, 0, 'content-graphics-menu-titleScreen');
            this.background.alpha = 0;
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;

            this.prompt = this.game.add.text((window.innerWidth / 2) - 90, window.innerHeight / 2, "Click to Start", { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });
            this.prompt.alpha = 0;

            //add animations
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.prompt).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

            //put event handler on user input to load the game fully when the user clicks a button.
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        //when user provides input, fade the menu screen out and load the first level.
        fadeOut()
        {      
            this.add.tween(this.prompt).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        }

        //load the first level 
        startGame()
        {
            this.game.state.start('Level', true, false);
            
            //stop music
            this.titleMusic.stop(); 
        }
    }
}