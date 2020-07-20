//creates divs when the page is loaded.
document.onload = createDivs();


function createDivs(grid = 16){
    console.time('adding divs');
    const container = document.getElementById('main-container');
    //check if there are existing divs and if so, remove them.
    const divs = document.querySelectorAll('.grid-item');
    if(divs.length){
        container.innerHTML = '';
    }
    //define the width and height of the divs to come:
    let divWidth = `${Math.round(container.offsetWidth/grid) - (container.offsetWidth/grid/90)}px`;
    let divHeight = `${container.offsetHeight/grid - (container.offsetHeight/grid/20)}px`;
    //loop that creates the amount of divs specified in the argument. Default is 256.
    for (let i = 0; i < grid*grid; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        const divOpacity = document.createAttribute('data-opacity');
        divOpacity.value = 0;
        div.setAttributeNode(divOpacity);
        
        div.style.width = divWidth;
        div.style.height = divHeight;
        container.appendChild(div);
    }
    
    addHoverEvent();
    console.timeEnd('adding divs');
}

function addHoverEvent(){
    const divs = document.querySelectorAll('.grid-item');
    divs.forEach((item) => {
        item.addEventListener('mouseover', (e) => {
            let opacity = +(e.target.dataset.opacity);
            opacity += 0.12;
            e.target.setAttribute('data-opacity', opacity);
            e.target.style.opacity = opacity;
            
            /* Chooses a random color:
            randomR = Math.floor(Math.random() * 240);
            randomG = Math.floor(Math.random() * 240);
            randomB = Math.floor(Math.random() * 240);
            e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;*/
        })
    })
}

document.getElementById('reset-btn').onclick= function resetGrid(){
    const divs = document.querySelectorAll('.grid-item');
    divs.forEach((item) => {
        item.style.opacity = 0.05;
        item.setAttribute('data-opacity', 0.05);
    })
}
document.getElementById('change-grid-btn').onclick = function createNewGrid(){
    let newGrid = 0;
    do{
        newGrid = prompt('How big should the grid be? Enter a number between 1 and 99', 0);
        console.log(Number(newGrid));
        //if user clicks on cancel.
        if(newGrid == null){
            return;
        }
    }while(Number(newGrid) >= 100 || Number(newGrid) <= 0 || isNaN(Number(newGrid)));
    createDivs(newGrid);
}

