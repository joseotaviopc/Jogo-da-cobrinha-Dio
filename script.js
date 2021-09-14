let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
let direction = "right";
let food = {
    x: Math.floor((Math.random() * 20) + 1) * box,
    y: Math.floor((Math.random() * 30) + 1) * box
};

snake[0]= {
    x: 10 * box,
    y: 15 * box
};


// Função para criar o fundo
function criarBG() {
    context.fillStyle = '#222';
    context.fillRect(0, 0, 20 * box, 30 * box);
};

// Função para criar a cobrinha
function criarCobrinha() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função criar a comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Capturar o teclado
document.addEventListener('keydown', update);

// ******************************************* //
// Função de Mudança de direção com o teclado
// ******************************************* //
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 40 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 38 && direction != "up") direction = "down";
};

// **************************** //
// Função para iniciar o jogo   //
// **************************** //
function iniciarJogo() {
    
    // Condições para manter a cobra dentro do "box"
    if(snake[0].x > 20 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 20 * box;
    if(snake[0].y > 30 * box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "down") snake[0].y = 30 * box;
    
    // Função para ver se a cobra se choca com ela
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            // console.log(`Snake[0]=${snake[0].x} e Snake[i]=${snake[i].x}`);
            // console.log(`Snake[0]=${snake[0].y} e Snake[i]=${snake[i].y}`);
            console.log("GAME OVER :(");
            console.log(`Você marcou ${snake.length} pontos`);
            alert(`GAME OVER :(. Você marcou ${snake.length} pontos`);

            clearInterval(jogo);       
        }
    };

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // incremento na direção
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    // Verifica a posição da cobra vs comida
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor((Math.random() * 15) + 1) * box;
        food.y = Math.floor((Math.random() * 15) + 1) * box;
    };

    
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Incremento do array(cria o movimento)
    snake.unshift(newHead);

}

// Rodar o jogo a cada tempo milisegundos
let jogo = setInterval(iniciarJogo, 150);

// ESC para parar o jogo
document.addEventListener('keydown', verEsc);

function verEsc(event) {
    if(event.keyCode == 27) {
        setInterval(3000);
        console.log(`Snake[0].x=${snake[0].x} e Snake[0].y=${snake[0].y}`);
        console.log("JOGO PARADO");
    };
    // if(event.keyCode == 27) {
    //     setInterval(jogo, 120); 
    // };
};
