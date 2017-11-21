//**************** Enemy **********************//

var Enemy = function(x,y) {
    // Load the image, set enemy's initial position and speed
    // Speed calculation based on: https://www.w3schools.com/jsref/jsref_random.asp

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter to ensure the game runs at the same
    // speed for all computers

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



//****************** Player ************************//
var Player = function() {
    "use strict";
    
    // Choose the caracter before starting the game
    // Set player's initial position, score and collectables

    var allCharacter = ['images/char-boy.png','images/char-cat-girl.png', 'images/char-horn-girl.png',
                    'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    var choosePlayer = document.getElementById('choosePlayer');
    
    var char0 = document.getElementById('char0');
    var char1 = document.getElementById('char1');
    var char2 = document.getElementById('char2');
    var char3 = document.getElementById('char3');
    var char4 = document.getElementById('char4');

    this.sprite = 'images/char-boy.png';
   

    char0.addEventListener('click', function(){
        player.sprite = allCharacter[0];
        choosePlayer.style.display = 'none';       
    });

    char1.addEventListener('click', function(){
        player.sprite = allCharacter[1];
        choosePlayer.style.display = 'none';       
    });
    
    char2.addEventListener('click', function(){
        player.sprite = allCharacter[2];
        choosePlayer.style.display = 'none';       
    });

    char3.addEventListener('click', function(){
        player.sprite = allCharacter[3];
        choosePlayer.style.display = 'none';       
    });

    char4.addEventListener('click', function(){
        player.sprite = allCharacter[4];
        choosePlayer.style.display = 'none';       
    });    

    
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.collectables = 0;


};

Player.prototype.update = function() {
    var score = document.querySelector('span.score');
    var collectables = document.querySelector('span.collectables');
    var gameScoreModal = document.getElementById('gameScore');
    var resetButton = document.getElementById('resetButton'); 


    this.currentX = player.x;
    this.currentY = player.y;
    
    // Update player's position

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


    // Reset player's position when a collision occurs

    for (var i=0; i<allEnemies.length; i++) {
        if (player.y === allEnemies[i].y && (player.x - allEnemies[i].x > 0 
        && player.x - allEnemies[i].x < 50)) { 
            reset();
            player.score = player.score - 1;
            score.innerHTML = player.score;
        }
    }


    // Remove the collectables (heart, star and key) from the board when the 
    // player gets them and unable player to go to a position where there is a rock

    if (player.x === heart.x && player.y === heart.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        heart.x = -100;
        heart.y = -100;
    }
    
    if (player.x === key.x && player.y === key.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        key.x = -100;
        key.y = -100;
    }
    
    if (player.x === star.x && player.y === star.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        star.x = -100;
        star.y = -100;
    }

    for (var i=0; i<allRocks.length; i++) {
        if (player.x === allRocks[i].x && player.y === allRocks[i].y) {
            player.x = this.currentX;
            player.y = this.currentY;
        }
    }

    // Game finishes when player gets all 3 collectables and reaches the water

    if (this.collectables === 3 && this.y === -50 ) {
        showResults();
    }
   
    // Block the player's movement after the game over modal appears

    if (gameScoreModal.style.display === 'block') {
        this.x = 200;
        this.y = 400;
    }   

    // Show results when the game is over

    function showResults() {
        var scoreResult = document.querySelector('span.scoreResult');
        var collectablesResult = document.querySelector('span.collectablesResult');
        
        document.getElementById('gameScore').style.display = 'block';
        scoreResult.innerHTML = score.innerHTML;
        collectablesResult.innerHTML = collectables.innerHTML;
    }

    resetButton.addEventListener('click', function() {
        gameScoreModal.style.display = 'none';
        resetGame();
    });

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the user's input for the player movement in the board

Player.prototype.handleInput = function(keyPressed) {
    this.keyPressed = keyPressed;
};


// Reset the player position when enemy hits the player
reset = function() {
    player.x = 200;
    player.y = 400;
};

// Reset the game when player gets all 3 collectables and reaches the water
resetGame = function () {
    var score = document.querySelector('span.score');
    var collectables = document.querySelector('span.collectables');
    
    player.x = 200;
    player.y = 400;
    
    heart.x = 200;
    heart.y = 130;
    
    key.x = 0;
    key.y = 40;

    star.x = 400;
    star.y = 40;

    allRocks[0].x = 400;
    allRocks[0].y = 130;

    allRocks[1].x = 200;
    allRocks[1].y = 220;

    player.score = 0;
    player.collectables = 0;
    score.innerHTML = player.score;
    collectables.innerHTML = player.collectables;
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


//********* Instantiate all objects **************//

var allEnemies = [];
allEnemies.push(new Enemy(0,220), new Enemy(0,130), new Enemy(0,40));


var player = new Player();

var heart = new Heart(200,130);

var key = new Key(0,40);

var star = new Star(400,40);

var allRocks = [];
allRocks.push(new Rock (400,130), new Rock (200,220));


// Listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


