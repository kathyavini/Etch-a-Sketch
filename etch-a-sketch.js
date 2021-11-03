let colorArray = ["#4d7558","#b3d686","#b9a67b","#C5DCCC","#739c55", "#F7F9F4", '#A5C092'];


// Add event listeners to grid-layout buttons
const grid9 = document.querySelector('.grid9');
grid9.addEventListener('click', () => {
    createGrid(9);
    colorChangeOnPointerEnter();
    });
const grid16 = document.querySelector('.grid16');
grid16.addEventListener('click', () => {
    createGrid(16);
    colorChangeOnPointerEnter();
    });
const grid25 = document.querySelector('.grid25');
grid25.addEventListener('click', () => {
    createGrid(25);
    colorChangeOnPointerEnter();
    });

// Add event listeners to palette selectors
const autumn = document.querySelector('.autumn-palette');
autumn.addEventListener('click', () => {
    clearGrid();
    setColorArray('autumn');
    autumn.classList.add('selected');
    theme.classList.remove('selected');
});

const theme = document.querySelector('.theme-palette');
theme.classList.add('selected');
theme.addEventListener('click', () => {
    clearGrid();
    setColorArray('theme');
    theme.classList.add('selected');
    autumn.classList.remove('selected');
});

function setColorArray(palette) {
    switch(palette) {
        case 'autumn':
            colorArray = ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"];
            break;
        case 'theme':
            colorArray = ["#4d7558","#b3d686","#b9a67b","#C5DCCC","#739c55", "#F7F9F4", '#A5C092'];
            break;
    }
}

// Create an n x n Grid in the container element
function createGrid(n) {
    const grid = document.querySelector('.grid');
    // Clear previous grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    // Use CSS grid to place elements
    grid.style.gridTemplate = 
        `repeat(${n}, 1fr) / repeat(${n}, 1fr)`;
    for (let i = 1; i <= n*n; i++) {
        let div = document.createElement('div');
        div.classList.add(`div${i}`);
        grid.appendChild(div);
    }
}

// Add eventListeners for pointer entry
function colorChangeOnPointerEnter() {
    const targets = document.querySelectorAll('.grid div');
    targets.forEach((target) => {
        target.addEventListener('pointerenter', function() {
            target.style.backgroundColor = pickColor();
        });
    });
}

// colorArray = ["#4d7558","#b3d686","#b9a67b","#C5DCCC","#739c55", "#F7F9F4"];

// Autumn pallette
// colorArray = ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"]

// //Purple Green Palette
// ["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"];

// Select a random color from the colorArray
function pickColor() {
    color = colorArray[Math.floor(Math.random()*colorArray.length)];
    return color;
}

// Clear background colors from the grid
function clearGrid() {
    targets = document.querySelectorAll('.grid div');
    targets.forEach((target) => { 
        target.style.backgroundColor = ''; })
}