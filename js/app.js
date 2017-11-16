//**************** Enemy **********************//

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


//****************** Player ************************//
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
};

Player.prototype.update = function() {
    var score = document.querySelector('span.score');
    //console.log(player.y);

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
    if (this.keyPressed === 'up' && this.y === -50) {
        this.score = this.score + 1;
        score.innerHTML = this.score;
        setTimeout(function() {
            reset();
        }, 800);
    }


    this.keyPressed = undefined;

    for(i=0; i<allEnemies.length; i++) {
        if(player.y === allEnemies[i].y && (player.x - allEnemies[i].x > 0 
        && player.x - allEnemies[i].x < 50)) { 
            reset();
            player.score = player.score - 1;
            score.innerHTML = player.score;
        }
    }


    if (player.x === heart.x && player.y === heart.y) {
        heart.x = -100;
        heart.y = -100;
    }
    
    if (player.x === key.x && player.y === key.y) {
        key.x = -100;
        key.y = -100;
    }
    
    if (player.x === star.x && player.y === star.y) {
        star.x = -100;
        star.y = -100;
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

//****************** Heart ***********************//

var Heart = function(x,y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
};


Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//****************** Key *************************//

var Key = function(x,y) {
    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
};


Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//***************** Star ************************//

var Star = function(x,y) {
    this.sprite = 'images/Star.png';
    this.x = x;
    this.y = y;
};


Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//***************** Rock ************************//

var Rock = function(x,y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};


Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy(0,220), new Enemy(0,130), new Enemy(0,40));


var player = new Player();

var heart = new Heart(400,220);

var key = new Key(0,40);

var star = new Star(200,130);

var allRocks = [];
allRocks.push(new Rock (200,220));

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
