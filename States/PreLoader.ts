module MINILD50
{
    export class PreloaderState extends Phaser.State
    {

        preload()
        {
            //Load audio in.
            this.load.audio('titleScreenTrack', ['content/audio/music/electronica-music-loop.mp3']);
        }

        create()
        {
            var titleMusic = this.add.audio('titleScreenTrack', 1, true);

            titleMusic.play('titleScreenTrack', 0, 1, true);
        }

    }

}