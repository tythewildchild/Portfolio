const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

//Sounds
let eat = new Audio();
let play = new Audio();

eat.src= "../Extras/eating.mp3"
play.src="../Extras/play.mp3"

var snake;
var apple;

function Snake(){
    this.x = 20;
    this.y = 30;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.score = 0;
    this.tail = [];

    this.draw = function(){
        ctx.fillStyle = "green";

        for(let i = 0; i < this.tail.length; i++){
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function(){

        for(let i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.score - 1] = {x: this.x, y:this.y};
        snake.x += snake.xSpeed;
        snake.y += snake.ySpeed;
        this.eat();
        this.collision();
        //Canvas Collision
        if(this.x > canvas.width - 10){
            snake.x -= canvas.width;
        }
        if(this.x < 0){
            snake.x += canvas.width;
        }
        if(this.y >= canvas.height){
            snake.y -= canvas.height;
        }
        if(this.y < 0){
            snake.y += canvas.height;
        }

    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'up':
                if(this.ySpeed > 0){
                    break;
                }
                this.ySpeed = scale * -1;
                this.xSpeed = scale * 0;
                break;
            case 'down':
                if(this.ySpeed < 0){
                    break;
                }
                this.ySpeed = scale * 1;
                this.xSpeed = scale * 0;
                break;
            case 'left':
                if(this.xSpeed > 0){
                    break;
                }
                this.ySpeed = scale * 0;
                this.xSpeed = scale * -1;
                break;
            case 'right':
                if(this.xSpeed < 0){
                    break;
                }
                this.ySpeed = scale * 0;
                this.xSpeed = scale * 1;
                break;
        }
        play.play();
    }

    this.eat = function(){
        if(snake.x === apple.x && snake.y === apple.y){
            eat.play();
            this.score++;
            apple = new Apple();
            apple.draw();
            return true;
        }
        else{
            return false;
        }
    }

    this.collision = function(){
        for(let i = 0; i < this.tail.length; i++){
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                this.score = 0;
                this.tail = [];
            }
        }
    }
    
}

function Apple(){
    this.x = Math.floor(Math.random() * rows - 1) * scale;
    this.y = Math.floor(Math.random() * columns - 1) * scale;
    if(this.x < 0){
        this.x = 0;
    }
    if(this.y < 0){
        this.y = 0;
    }

    this.draw = function(){
       ctx.fillStyle = "red";
       ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function(){

        // console.log(this.x, this.y)
    }
}



function setup(){
    snake = new Snake();
    apple = new Apple();
}
setup();

window.setInterval(()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
    apple.draw();
    snake.update();
    apple.update();
    document.getElementById("score").innerText = snake.score;
    
}, 100)


window.addEventListener('keydown', ((evt)=>{
    let direction = evt.key;
    switch(direction){
        case 'w':
            direction = 'up';
            break;
        case 'Up arrow':
            direction = 'up';
            break;
        case 'a':
            direction = 'left';
            break;
        case 'Left arrow':
            direction = 'left';
            break;
        case 's':
            direction = 'down';
            break;
        case 'Down arrow':
            direction = 'down';
            break;
        case 'Right arrow':
            direction = 'right';
            break;
        case 'd':
            direction = 'right';
            break;
    }
    snake.changeDirection(direction);
}))