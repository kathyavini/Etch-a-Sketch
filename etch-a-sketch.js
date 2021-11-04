const grid = document.querySelector('.grid');

// Add event listeners to grid-layout buttons
const grid9 = document.querySelector('.grid9');
grid9.addEventListener('click', () => {
    createGrid(9);
    });
const grid16 = document.querySelector('.grid16');
grid16.addEventListener('click', () => {
    createGrid(16);
    });
const grid25 = document.querySelector('.grid25');
grid25.addEventListener('click', () => {
    createGrid(25);
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

//Pick randomly from one of the two layouts upon load
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
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.style.gridTemplate = 
        `repeat(${n}, 1fr) / repeat(${n}, 1fr)`;
    for (let i = 1; i <= n*n; i++) {
        let div = document.createElement('div');
        div.classList.add(`div${i}`);
        div.classList.add(`generatedDiv`)
        grid.appendChild(div);
    }
    // Add both kinds on event listener
    colorChangeOnPointerEnter();
    colorChangeOnTouch();
}

// Add pointer functionality (mouse or tap)
function colorChangeOnPointerEnter() {
    const targets = document.querySelectorAll('.grid div');
    targets.forEach((target) => {
        target.addEventListener('pointerenter', function() {
            target.style.backgroundColor = pickColor();
        });
    });
}

// Touch functionality
function colorChangeOnTouch() {
    let lastDiv;
    grid.addEventListener("touchmove", (ev) => {
        touchedDiv = document.elementFromPoint(ev.touches[0].clientX, 
                ev.touches[0].clientY);
            if (touchedDiv && touchedDiv.classList.contains('generatedDiv') && 
                !(touchedDiv === lastDiv)) {
            touchedDiv.style.backgroundColor = pickColor();
            lastDiv = touchedDiv;
        }
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
    const container = document.querySelector('.container');
    const header = document.querySelector('header');
    const options = document.querySelector('.options');
    const footer = document.querySelector('footer');
    container.classList.toggle('layout2');
    header.classList.toggle('layout2');
    options.classList.toggle('layout2');
    footer.classList.toggle('layout2');
}