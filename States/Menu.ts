module MINILD50
{
    export class MenuState extends Phaser.State
    {
        //reference to the title music object.
        titleMusic: Phaser.Sound;
        background: Phaser.Sprite;
        prompt:     Phaser.Text;

        preload()
        {
           //Load audio in.
            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');

            //load graphics in.
            this.load.image('titleScreen', 'Content/Graphics/Menu/titleScreen.jpg');
        }

        create()
        {
            //play title music.
            this.titleMusic = this.add.audio('content-audio-music-titleScreenMusic', 1, true);
            this.titleMusic.play();

            this.background = this.add.sprite(0, 0, 'titleScreen');
            this.background.alpha = 0;

            this.prompt = this.game.add.text((this.camera.width / 2) - 100, this.camera.height / 2, "Press Enter to Start", { font: "30px Arial", fill: "#ff0000", stroke: '#000000', strokeThickness: 3 });

            //add animations
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            //this.add.tween(this.prompt).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);



            //put event handler on user input to load the game fully when the user clicks a button.
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        //when user provides input, fade the menu screen out and load the first level.
        fadeOut()
        {
            //delete text prompt
            this.prompt = null;

            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        //load the first level - atm we dont have one so just loop back to the loading bar state.
        startGame()
        {
            this.game.state.start('Preloader', true, false);

            //stop music and delete assets
            this.titleMusic.stop();
            this.titleMusic = null;
            this.background = null;
            
        }
    }
}