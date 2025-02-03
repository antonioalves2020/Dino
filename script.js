document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const textBox = document.querySelector(".text-box");
    const jumpCounter = document.getElementById("jump-counter");

    let gameRunning = false;
    let gameOver = false;
    let jumpCount = 0;

    // Atualiza contador de pulos
    function updateJumpCounter() {
        jumpCounter.textContent = `Pulos: ${jumpCount}`;
    }

    // Função para iniciar o jogo
    startBtn.addEventListener("click", () => {
        if (!gameRunning) {
            textBox.textContent = "Desvie do obstáculo!";
            obstacle.classList.add("obstacle-move");
            gameRunning = true;
            gameOver = false;
            jumpCount = 0;
            updateJumpCounter();
        }
    });

    // Função de pulo do jogador
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && gameRunning && !gameOver) {
            player.classList.add("jump");
            jumpCount++;
            updateJumpCounter();
            setTimeout(() => {
                player.classList.remove("jump");
            }, 500);
        }
    });

    // Verifica colisão
    setInterval(() => {
        if (gameRunning && !gameOver) {
            let playerRect = player.getBoundingClientRect();
            let obstacleRect = obstacle.getBoundingClientRect();

            if (
                playerRect.right > obstacleRect.left &&
                playerRect.left < obstacleRect.right &&
                playerRect.bottom > obstacleRect.top
            ) {
                gameOver = true;
                gameRunning = false;
                textBox.textContent = "Game Over!";
                obstacle.classList.remove("obstacle-move");
            }
        }
    }, 50);

    // Função para avançar (pode ser usada para mudar cenário, skins, etc.)
    nextBtn.addEventListener("click", () => {
        textBox.textContent = "Próxima fase em breve!";
    });
});
