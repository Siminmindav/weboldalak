const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const friction = 0.8;

const player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    jumping: false,
    grounded: false,
};

const keys = {
    right: false,
    left: false,
    up: false,
};

const platforms = [
    { x: 0, y: 550, width: 800, height: 50 },
    { x: 200, y: 450, width: 100, height: 10 },
    { x: 400, y: 350, width: 100, height: 10 },
    { x: 600, y: 250, width: 100, height: 10 },
];

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlayer() {
    if (keys.right) {
        player.dx = player.speed;
    } else if (keys.left) {
        player.dx = -player.speed;
    } else {
        player.dx = 0;
    }

    if (keys.up && !player.jumping) {
        player.dy = -10;
        player.jumping = true;
    }

    player.dy += gravity;
    player.x += player.dx;
    player.y += player.dy;

    player.grounded = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.grounded = true;
            player.jumping = false;
            player.dy = 0;
            player.y = platform.y - player.height;
        }
    });

    if (player.grounded) {
        player.dy *= friction;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPlayer();
    drawPlatforms();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keys.right = true;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        keys.left = true;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        keys.up = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keys.right = false;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        keys.left = false;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        keys.up = false;
    }
});

gameLoop();
