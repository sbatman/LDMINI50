module MINILD50
{
    export class Player extends Phaser.Sprite
    {
        cursors: Phaser.CursorKeys;

        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'content-graphics-character-faithSpriteSheet', 0);
            this.anchor.setTo(0.5, 0);

            this.animations.add('walk', [0,1], 5, true);
            

            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.cursors = game.input.keyboard.createCursorKeys();     
        }

        PhysicsUpdate()
        {
            this.game.camera.x = this.body.position.x;

            //calculate animation speed.
            var speed = Math.abs(this.body.velocity.x) / 5;

            if (speed < 5) speed = 5;
            if (speed > 10) speed = 10;

            this.animations.getAnimation('walk').speed = speed;


            if (this.body.touching.down) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x -= 5;
                    this.animations.play('walk');

                    if (this.scale.x == 1) this.scale.x = -1;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x += 5;
                    this.animations.play('walk');
                    if (this.scale.x == -1) this.scale.x = 1;
                }
                else {
                    this.animations.frame = 0;
                    this.body.velocity.x *= 0.6;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -190;
                }
            }
            else
            {
                this.animations.frame = 1;
            }

            (<Phaser.Physics.Arcade.Body>this.body).checkCollision.left = true;
            (<Phaser.Physics.Arcade.Body>this.body).checkCollision.right = true;
            if (this.body.touching.right)
            {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                {
                    this.body.velocity.y = -140;
                    this.body.velocity.x = -this.body.velocity.x;
                    this.body.velocity.x -= 40;
                }
            }
            else if (this.body.touching.left)
            {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                {
                    this.body.velocity.y = -140;
                    this.body.velocity.x = -this.body.velocity.x;
                    this.body.velocity.x +=40;
                }
            }       
        }
    }
}