const inputText = document.getElementById('input-text');
const inputDate = document.getElementById('input-date')
const createElement = document.getElementById('input-submit');
const wrapper = document.querySelector('.wrapper');
const casesWrapper = document.getElementById('cases=wrapper');
const toDoList = [];

createElement.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputText.value === '') return;
    
    const newToDo = {
        name: inputText.value,
        checked: false,
        createDate: inputDate.value
    };
    toDoList.push(newToDo);
    displayElements();
    inputText.value = '';
    inputDate.value = '';
});

function displayElements() {
    const createCasesContainer = document.createElement('div');
    const createCases = createCasesContainer.appendChild(document.createElement('p'));
    const createDate = createCasesContainer.appendChild(document.createElement('p'));
    const createCross = createCasesContainer.appendChild(document.createElement('span'));
    
    for (let i = 0; i <= toDoList.length; i++) {
        
        casesWrapper.append(createCasesContainer); 
        createCasesContainer.className = 'cases-container';
        createCasesContainer.id = i;
        createCases.className = 'cases-text'; 
        createDate.className = 'cases-text';
        createCross.className = 'cases-cross';
        createCases.innerHTML = inputText.value;
        createDate.innerHTML = inputDate.value;
        createCross.innerHTML = 'X';  
    }

    casesWrapper.addEventListener('click', (event) => {
        if (event.target.className === 'cases-cross') {
            event.target.parentNode.remove(); // не получится перерисовать массив так как сработает столько кликов, сколько тудушек на странице
        } 

        const indexInArray = event.target.parentNode.id - 1; // index of element in array
        toDoList.splice([indexInArray], 1);
    });
}
