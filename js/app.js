//**************** Enemy **********************//

var Enemy = function(x,y) {
    "use strict";
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
    var allCharacterLength = allCharacter.length;

    for (var i=0; i < allCharacterLength; i++) {
        var character = 'char' + i;
        character = document.getElementById(character);
    }

    this.sprite = 'images/char-boy.png';
   

    char0.addEventListener('click', function() {
        this.sprite = allCharacter[0];
        choosePlayer.style.display = 'none';       
    }.bind(this));

    char1.addEventListener('click', function(){
        this.sprite = allCharacter[1];
        choosePlayer.style.display = 'none';       
    }.bind(this));
    
    char2.addEventListener('click', function(){
        this.sprite = allCharacter[2];
        choosePlayer.style.display = 'none';       
    }.bind(this));

    char3.addEventListener('click', function(){
        this.sprite = allCharacter[3];
        choosePlayer.style.display = 'none';       
    }.bind(this));

    char4.addEventListener('click', function(){
        this.sprite = allCharacter[4];
        choosePlayer.style.display = 'none';       
    }.bind(this));    

    
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


    // currentX and currentY are used to update the player's position in the checkRockCollisions function

    this.currentX = this.x;
    this.currentY = this.y;

    
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
            this.reset();
        }.bind(this), 800);

    }

    this.keyPressed = undefined;


    
    this.checkEnemyCollisions();
    this.getCollectables();
    this.checkRockCollisions();


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


// Reset the player's position when a collision with the enemy occurs
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Reset player's position when a enemy collision occurs
Player.prototype.checkEnemyCollisions = function() {
    var score = document.querySelector('span.score');
    var allEnemiesLength = allEnemies.length;

    for (var i=0; i < allEnemiesLength; i++) {
        if (this.y === allEnemies[i].y && (this.x - allEnemies[i].x > 0 
        && this.x - allEnemies[i].x < 50)) { 
            this.reset();
            this.score = this.score - 1;
            score.innerHTML = this.score;
        }
    }
}

// Remove the collectables (heart, star and key) from the board when the 
// player gets them and unable player to go to a position where there is a rock
Player.prototype.getCollectables = function() {
    var collectables = document.querySelector('span.collectables');

    if (this.x === heart.x && this.y === heart.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        heart.x = -100;
        heart.y = -100;
    }
    
    if (this.x === key.x && this.y === key.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        key.x = -100;
        key.y = -100;
    }
    
    if (this.x === star.x && this.y === star.y) {
        this.collectables = this.collectables + 1;
        collectables.innerHTML = this.collectables;
        star.x = -100;
        star.y = -100;
    }
}

// Unable player for moving to a rock's position
Player.prototype.checkRockCollisions = function() {
    for (var i=0; i < allRocks.length; i++) {
        if (this.x === allRocks[i].x && this.y === allRocks[i].y) {
            this.x = this.currentX;
            this.y = this.currentY;
        }
    }
}


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
};


//****************** Heart ***********************//

var Heart = function(x,y) {
    "use strict";

    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
};


Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//****************** Key *************************//

var Key = function(x,y) {
    "use strict";

    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
};


Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//***************** Star ************************//

var Star = function(x,y) {
    "use strict";

    this.sprite = 'images/Star.png';
    this.x = x;
    this.y = y;
};


Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//***************** Rock ************************//

var Rock = function(x,y) {
    "use strict";

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


