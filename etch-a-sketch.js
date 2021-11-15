const grid = document.querySelector('.grid');
let currentColorTheme;
let pointerEntryModeActive = true;
let shadingMode = false;
let pointerActiveBeforeErase;
let shadingActiveBeforeErase;
let lastDiv;

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
    setColorArray('autumn');
});
const july = document.querySelector('.july-palette');
july.addEventListener('click', () => {
    setColorArray('july');
});
const purple = document.querySelector('.purple-palette');
purple.addEventListener('click', () => {
    setColorArray('purple');
});
const green = document.querySelector('.green-palette');
green.addEventListener('click', () => {
    setColorArray('green');
});
const blue = document.querySelector('.blue-palette');
blue.addEventListener('click', () => {
    setColorArray('blue');
});
const brownTan = document.querySelector('.brown-tan-palette');
brownTan.addEventListener('click', () => {
    setColorArray('brown-tan');
});

// Start with the Autumn Palette
setColorArray('autumn');

// Add event listener to the background switcher
const bgSwitch = document.querySelector('input');
bgSwitch.addEventListener('change', () => {
	changeLayout();
});

// Add event listener for shading button
const shading = document.querySelector('.shading');
shading.addEventListener('click', () => {
    toggleShadingMode();
});

function toggleShadingMode() {
    shading.classList.toggle('active');
    shadingMode = !shadingMode;
}


/*----------- ERASER FUNCTIONS --------*/
/*--------------------------------------*/

// Add event listener for eraser button
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
    toggleEraserMode();
});

// Allow mouse/pen (but not touch!) to start and stop the mouseover effect
grid.addEventListener("pointerdown", (ev) => {
    if (ev.pointerType !== "touch") {
        togglePointerEvents();
    } 
});

// Add keyboard shortcuts for both
window.addEventListener("keydown", (ev) => {
    switch(ev.key) {
        case ' ':
            ev.preventDefault();
            togglePointerEvents();
            break;
        case 'e':
            toggleEraserMode();
            break;
        case 's':
            toggleShadingMode();
            break;
    }
});

function togglePointerEvents() {
    if (pointerEntryModeActive) {
        const targets = document.querySelectorAll('.grid div');
        targets.forEach((target) => {
            target.style.pointerEvents = 'none';})
        pointerEntryModeActive = false;
    } else {
        const targets = document.querySelectorAll('.grid div');
        targets.forEach((target) => {
            target.style.pointerEvents = 'auto';})
        pointerEntryModeActive = true;
    }
}

function toggleEraserMode() {
    // If eraser is being turned off
    if (document.querySelector('.on')) {
        eraser.classList.remove('on');
        setColorArray(currentColorTheme);
        // Restore previous pointer setting
        if (!pointerActiveBeforeErase) {
            // turn it back off
            togglePointerEvents();
        }
        if (shadingActiveBeforeErase) {
            // turn it back on
            toggleShadingMode();
        }
    } else {
        // Turn on pointer events when you turn on eraser
        if (!pointerEntryModeActive) {
            togglePointerEvents();
        // but save previous setting
            pointerActiveBeforeErase = false;
        } else {
            pointerActiveBeforeErase = true;
        }
        // Turn off shading to return indices to 0
        if (shadingMode) {
            toggleShadingMode();
            shadingActiveBeforeErase = true;
        } else {
            shadingActiveBeforeErase = false;
        }
        setColorArray('erase');
        eraser.classList.add('on');
    }
}

// Erase pixel with double-tap for touchscreen
function eraseOnDoubleTap() {
    let lastTouch = 0;
    grid.addEventListener("touchstart", (ev) => {
        currentTouch = ev.timeStamp;
        if (currentTouch - lastTouch <= 300) {
            currentDiv = document.elementFromPoint(ev.touches[0].clientX, 
                ev.touches[0].clientY);
            currentDiv.style.backgroundColor = '';
            currentDiv.index = 0;
        } else {
            lastTouch = currentTouch;
        }
    });
}

/*------------ CORE FUNCTIONS ----------*/
/*--------------------------------------*/
function setColorArray(palette) {
    // Remove selection from previous theme
    while (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected');
    }
    // Remove CSS indicator that eraser is on
    if (document.querySelector('.on')) {
        eraser.classList.remove('on');
    }
    switch(palette) {
        case 'autumn':
            colorArray = ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"].reverse();
            autumn.classList.add('selected');
            break;
        case 'july':
            colorArray = ["#fff75e","#fff056","#ffe94e","#ffe246","#ffda3d","#ffd53e","#fecf3e","#fdc43f","#fdbe39","#fdb833"];
            july.classList.add('selected');
            break;
        case 'purple':
            colorArray = ["#10002b","#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd","#c77dff","#e0aaff"].reverse();
            purple.classList.add('selected');
            break;
        case 'green':
            colorArray = ["#d8f3dc","#b7e4c7","#95d5b2","#74c69d","#52b788","#40916c","#2d6a4f","#1b4332","#081c15"];
            green.classList.add('selected');
            break;
        case 'blue':
            colorArray = ["#ccdbfd","#c1d3fe","#abc4ff","#769ff8","#4179f1","#1b5eee"];
            blue.classList.add('selected');
            break;
        case 'brown-tan':
            colorArray = ["#1a120e","#33261f","#4b3b30","#645140","#7b6751","#937e62","#a89475","#bcaa87","#d4c197","#ebd8a7"].reverse();
            brownTan.classList.add('selected');
            break;
        case 'erase':
            colorArray = [""];
            return;            
    }
    currentColorTheme = palette;
}

function createGrid(n) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.style.gridTemplate = 
        `repeat(${n}, 1fr) / repeat(${n}, 1fr)`;
    for (let i = 1; i <= n*n; i++) {
        let div = document.createElement('div');
        // div.classList.add(`div${i}`); // Nice for troubleshooting
        div.index = 0; // for shading mode
        div.classList.add(`generatedDiv`)
        grid.appendChild(div);
    }
    // Add event listeners to grid
    colorChangeOnPointerEnter();
    colorChangeOnTouch();
    eraseOnDoubleTap();
}

// Pointer functionality (mouse or touch tap)
function colorChangeOnPointerEnter() {
    const targets = document.querySelectorAll('.grid div');
    targets.forEach((target) => {
        target.addEventListener('pointerenter', function() {
            newColorAndIndex = pickColor(target.index);
            target.style.backgroundColor = newColorAndIndex[0];
            target.index = newColorAndIndex[1];
        });
    });
}

// Touch functionality
function colorChangeOnTouch() {
    grid.addEventListener("touchmove", (ev) => {
        touchedDiv = document.elementFromPoint(ev.touches[0].clientX, 
                ev.touches[0].clientY);
                if (touchedDiv && touchedDiv.classList.contains('generatedDiv') && 
                    !(touchedDiv === lastDiv)) {
                        newColorAndIndex = pickColor(touchedDiv.index);
                        touchedDiv.style.backgroundColor = newColorAndIndex[0];
                        touchedDiv.index = newColorAndIndex[1];
                        lastDiv = touchedDiv;
                }
    });
}

function pickColor(index) {
    // Step through the palette if in shading mode
    if (shadingMode) {
        index = Math.min(index, colorArray.length - 1);
        let color = colorArray[index];
        index++;
        return [color, index];
    }
    // Otherwise select a random color from the colorArray
    index = Math.floor(Math.random()*colorArray.length);
    let color = colorArray[index];
    // but div's index should return to the lightest color for next shading mode
    return [color, 0];
}

function clearGrid() {
    const targets = document.querySelectorAll('.grid div');
    // Clear background colors from the grid
    targets.forEach((target) => { 
        target.style.backgroundColor = '';
        target.index = 0; })
}

// Toggle between two layouts
function changeLayout() {
    document.querySelector('.container').classList.toggle('layout2');
    document.querySelector('header').classList.toggle('layout2');
    document.querySelector('.options').classList.toggle('layout2');
    document.querySelector('footer').classList.toggle('layout2');
    document.querySelector('.instructions').classList.toggle('layout2');
}