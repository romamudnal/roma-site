const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = createGrid();

function createGrid() {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            grid[row][col] = Math.random() < 0.2 ? 1 : 0; // Random initial state
        }
    }
    return grid;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.fillStyle = grid[row][col] ? 'black' : 'white';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.strokeStyle = 'gray';
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function getNextGeneration(grid) {
    const newGrid = createEmptyGrid();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbours = countAliveNeighbours(grid, row, col);
            if (grid[row][col] === 1) {
                newGrid[row][col] = aliveNeighbours === 2 || aliveNeighbours === 3 ? 1 : 0;
            } else {
                newGrid[row][col] = aliveNeighbours === 3 ? 1 : 0;
            }
        }
    }
    return newGrid;
}

function createEmptyGrid() {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            grid[row][col] = 0;
        }
    }
    return grid;
}

function countAliveNeighbours(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                count += grid[nx][ny];
            }
        }
    }
    return count;
}

function update() {
    grid = getNextGeneration(grid);
    drawGrid();
    setTimeout(update, 50);
}

function resetGrid() {
    grid = createGrid();
}

// Initial draw and update
drawGrid();
update();

// Reinitialize grid every 5 seconds
setInterval(resetGrid, 7000);
