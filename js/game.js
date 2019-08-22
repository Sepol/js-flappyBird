const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeTop.src = "img/pipeTop.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы

const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

const gap = 90;

// Полет при нажатии любой кнопки

document.addEventListener("keydown", someMethod);

function someMethod (e) {
    if (e.keyCode == 38) {
        yPos = yPos - 20;
        fly.play()
    }
}

function playerDead() {
    window.location.reload();
}

// Создание блоков 

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

let score = 0;

// Позиция птички

let xPos = 10;
let yPos = 150;
const grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

        // Отслеживание прикосновений

        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x  + bird.width 
            && (yPos <= pipe[i].y + pipeTop.height 
                || yPos + bird.height >= pipe[i].y + pipeTop.height + gap)) {
            playerDead();
            return;
        }

        if (yPos + bird.height >= canvas.height - fg.height || yPos < 0) {
            playerDead();
            return;
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;