const inputText = document.getElementById('input-text');
const inputDate = document.getElementById('input-date')
const createElement = document.getElementById('input-submit');
const wrapper = document.querySelector('.wrapper');
const toDoList = [];

createElement.addEventListener('click', (e) => {
    e.preventDefault();
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
        
        wrapper.append(createCasesContainer); // create <div class="cases-container"></div>
        createCasesContainer.className = 'cases-container';
        createCasesContainer.id = 'container_' + i;
        createCases.className = 'cases-text'; // create <p class="'cases-text'"></p>
        createDate.className = 'cases-text';
        createCross.className = 'cases-cross';
        createDate.id = 'date_' + i;
        createCases.id = 'text_' + i;
        createCross.id = 'cross_' + i;
        createCases.innerHTML = inputText.value;
        createDate.innerHTML = inputDate.value;
        createCross.innerHTML = 'X';  
    }

    createCross.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    });
}

// вычеркивание будет реализовано при нажатии на конкретную тудушку
