// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 450) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
};

Player.prototype.update = function(dt) {

    if (this.keyPressed === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    if (this.keyPressed === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }
    if (this.keyPressed === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }
    if (this.keyPressed === 'up' && this.y > -50) {
        this.y = this.y - 90;
    }

    this.keyPressed = undefined;

    if(this.y === -50) { 
        setTimeout(function() {
            reset();
        }, 800);
        //this.score = this.score + 1;
        //console.log(this.score);
    }

    for(i=0; i<allEnemies.length; i++) {
        if(player.y === allEnemies[i].y && (player.x - allEnemies[i].x > 0 
            && player.x - allEnemies[i].x < 50)) { 
                reset();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    this.keyPressed = keyPressed;
};

reset = function() {
    player.x = 200;
    player.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy(0,220), new Enemy(0,130), new Enemy(0,40));


var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
