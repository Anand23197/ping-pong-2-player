const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;


let paddle = {h:50, w:5};
let leftpaddle = (righpaddle = ball = {});
let score = 0;
let increment = 0.2


setInitialVariables();
drawBall();
drawLeftPaddle();
drawRightPaddle();
drawScore();
drawCenterLine();
moveBall();
moveLeftPaddle();


function setInitialVariables(){
    ball = {x:150, y:150, r:10, dx: 2, dy: 1};
    leftpaddle = {x:0, y:125};
    righpaddle = {x: canvasW - 5 , y: 125};
}

 function moveLeftPaddle(){
      document.addEventListener('mousemove', (e) =>{
        leftpaddle.y = e.screenY - 350;
      })
}

function detectCollision(){
    //right paddle collision detection
    if(ball.x > righpaddle.x- ball.r){
        ball.dx = - ball.dx;
    }

    //left paddle collision detection
    if(ball.x < 0 + ball.r + paddle.w && ball.y > leftpaddle.y && ball.y < leftpaddle.y + paddle.h){
        ball.dx = - ball.dx + 2*increment;
        ball.dy += increment;
        score++;
    }

    //detect bottom or top collision
    if(ball.y > canvasH-ball.r || ball.y < 0+ball.r){
        ball.dy = - ball.dy;
    }

    //detect left paddle collision
    if(ball.x < 0 + ball.r){
        alert("you lost the game");
        setInitialVariables();
        score = 0;
    }

    
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    righpaddle.y = ball.y - paddle.h/2;
// clear canvas 
 ctx.clearRect(0,0, canvasW, canvasH);
 detectCollision();
    drawBall();
    drawScore();
    drawLeftPaddle();
    drawCenterLine();
    drawRightPaddle();
    requestAnimationFrame(moveBall);
}

function drawRightPaddle(){
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(righpaddle.x, righpaddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#F9FFA4'
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawLeftPaddle(){
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(leftpaddle.x, leftpaddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#F9FFA4'
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.setLineDash([]);
  ctx.closePath();
}

function drawScore(){
    ctx.beginPath();
    ctx.font = '20px serif';
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.fillText("score: " + score, 20, 20);
    ctx.closePath();
  }

function drawCenterLine(){
    ctx.beginPath();
    ctx.setLineDash([5,5]);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, canvasH);
    ctx.stroke();
    ctx.closePath();
}