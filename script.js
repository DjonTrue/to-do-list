const inputText = document.getElementById("inputText");
const inputDate = document.getElementById("inputDate");
const createElement = document.getElementById("inputSubmit");
const casesWrapper = document.getElementById("casesWrapper");
let toDoList = [];

const addTodo = (event) => {
    event.preventDefault();

    if (inputText.value === "") return;

    const newToDo = {
        id: toDoList.length,
        text: inputText.value,
        checked: false,
        createDate: inputDate.value,
    };

    toDoList.push(newToDo);
    displayElements(toDoList);

    inputText.value = "";
    inputDate.value = "";
};

const removeTodo = (event) => {
    if (event.target.className === "cases-cross") {
        const newArray = toDoList.filter(
            (todoItem) => todoItem.id !== Number(event.target.parentNode.id),
        );
        event.target.parentNode.remove();
        toDoList = newArray;    
    }
};

createElement.addEventListener("click", addTodo);

function displayElements(toDoList) {
    console.log(toDoList);

    const createCasesContainer = document.createElement("div");
    const createCases = createCasesContainer.appendChild(document.createElement("p"));
    const createDate = createCasesContainer.appendChild(document.createElement("p"));
    const createCross = createCasesContainer.appendChild(document.createElement("span"));

    toDoList.forEach((toDoItem) => {
        console.log(toDoItem);
        createCasesContainer.className = "cases-container";
        createCasesContainer.id = toDoItem.id;
        createCases.className = "cases-text";
        createDate.className = "cases-text";
        createCross.className = "cases-cross";
        createCases.innerHTML = toDoItem.text;
        createDate.innerHTML = toDoItem.createDate;
        createCross.innerHTML = "X";

        casesWrapper.append(createCasesContainer);
    });

    casesWrapper.addEventListener("click", removeTodo);
}