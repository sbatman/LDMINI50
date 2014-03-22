module MINILD50
{
    export class MenuState extends Phaser.State
    {
        //reference to the title music object.
        titleMusic: Phaser.Sound;

        preload()
        {
           //Load audio in.
            this.load.audio('content-audio-music-titleScreenMusic', 'Content/Audio/Music/titleScreenMusic.mp3');
        }

        create()
        {
            //play title music.
            this.titleMusic = this.add.audio('content-audio-music-titleScreenMusic', 1, true);
            this.titleMusic.play();
        }
    }
}