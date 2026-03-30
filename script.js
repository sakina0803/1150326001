const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const resultDiv = document.getElementById('result');

let gameRunning = false;
let playerPos = 50;
let aiPos = 50;
const finishLine = 700;
let playerSpeed = 5;
let aiSpeed = 3;

function drawBackground() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 終點線
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(finishLine, 0);
    ctx.lineTo(finishLine, canvas.height);
    ctx.stroke();
    
    // 萬聖節元素：簡單的南瓜和鬼魂圖案
    ctx.fillStyle = '#ff6600';
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(700, 100, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawRunners() {
    // 玩家南瓜
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(playerPos, 150, 40, 40);
    ctx.fillStyle = '#000';
    ctx.fillRect(playerPos + 10, 160, 5, 5);
    ctx.fillRect(playerPos + 25, 160, 5, 5);
    
    // AI鬼魂
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(aiPos, 250, 40, 40);
    ctx.fillStyle = '#000';
    ctx.fillRect(aiPos + 10, 260, 5, 5);
    ctx.fillRect(aiPos + 25, 260, 5, 5);
}

function updateGame() {
    if (!gameRunning) return;
    
    // AI移動
    aiPos += aiSpeed;
    
    // 檢查贏家
    if (playerPos >= finishLine) {
        resultDiv.textContent = '南瓜贏了！🎃';
        gameRunning = false;
    } else if (aiPos >= finishLine) {
        resultDiv.textContent = '鬼魂贏了！👻';
        gameRunning = false;
    }
    
    drawBackground();
    drawRunners();
    
    if (gameRunning) {
        requestAnimationFrame(updateGame);
    }
}

function startGame() {
    gameRunning = true;
    playerPos = 50;
    aiPos = 50;
    resultDiv.textContent = '';
    updateGame();
}

function resetGame() {
    gameRunning = false;
    playerPos = 50;
    aiPos = 50;
    resultDiv.textContent = '';
    drawBackground();
    drawRunners();
}

// 鍵盤控制
document.addEventListener('keydown', (e) => {
    if (gameRunning && e.key === 'ArrowRight') {
        playerPos += playerSpeed;
    }
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// 初始繪圖
drawBackground();
drawRunners();