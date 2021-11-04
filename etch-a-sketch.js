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
});

const theme = document.querySelector('.theme-palette');
theme.addEventListener('click', () => {
    clearGrid();
    setColorArray('theme');
});

// Start with the Theme Palette
setColorArray('theme');

//Pick from one of the two layouts
if (Math.floor(Math.random()*2)) {
    changeLayout();
}

function setColorArray(palette) {
    while (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected');
    }
    switch(palette) {
        case 'autumn':
            colorArray = ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"];
            autumn.classList.add('selected');
            break;
        case 'theme':
            colorArray = ["#4d7558","#b3d686","#b9a67b","#C5DCCC","#739c55", "#F7F9F4", '#A5C092'];
            theme.classList.add('selected');
            break;
    }
}


function createGrid(n) {
    const grid = document.querySelector('.grid');
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
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

function pickColor() {
    // Select a random color from the colorArray
    let color = colorArray[Math.floor(Math.random()*colorArray.length)];
    return color;
}

function clearGrid() {
    const targets = document.querySelectorAll('.grid div');
    // Clear background colors from the grid
    targets.forEach((target) => { 
        target.style.backgroundColor = ''; })
}

// Toggle between two layouts
function changeLayout() {
    let container = document.querySelector('.container');
    let header = document.querySelector('header');
    let options = document.querySelector('.options');
    let footer = document.querySelector('footer');
    container.classList.toggle('layout2');
    header.classList.toggle('layout2');
    options.classList.toggle('layout2');
    footer.classList.toggle('layout2');
}