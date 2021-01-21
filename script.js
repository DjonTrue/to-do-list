const inputText = document.getElementById('input-text');
const createElement = document.getElementById('input-submit');
const createCasesContainer = document.createElement('div');
const createCases = createCasesContainer.appendChild(document.createElement('p'));
const wrapper = document.querySelector('.wrapper');
const toDoList = [];

createElement.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputText.value === '') return;
    
    const newToDo = {
        name: inputText.value,
        checked: false,
        createDate: new Date()
    };
    toDoList.push(newToDo);
    displayElements();
    console.log(toDoList);
});

function displayElements() {
    for (let i = 0; i <= toDoList.length; i++) {
        wrapper.append(createCasesContainer); // create <div class="cases-container"></div>
        createCasesContainer.className = 'cases-container';
        createCasesContainer.id = 'container_' + i;
        createCases.className = 'cases-text'; // create <p class="'cases-text'"></p>
        createCases.id = 'text_' + i;
        createCases.innerHTML = inputText.value;
    
        
    };
}

// вычеркивание будет реализовано при нажатии на конкретную тудушку
