const inputText = document.getElementById("inputText");
const inputDate = document.getElementById("inputDate");
const createElement = document.getElementById("inputSubmit");
const casesWrapper = document.getElementById("casesWrapper");
const sortButton = document.getElementById("sort-select");
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

createElement.addEventListener("click", addTodo);

const checkedTodo = (event) => {
    if (event.target.className !== "cases-cross") {
        const element =
            event.target.className === "cases-text" ? event.target.parentNode : event.target;

        element.classList.toggle("cases-container-checked");
        !!element.classList.value.includes("cases-container-checked")
            ? (toDoList[element.id].checked = true)
            : (toDoList[element.id].checked = false);
    }
};

const removeTodo = (event) => {
    if (event.target.className === "cases-cross") {
        const newArray = toDoList.filter(
            (todoItem) => todoItem.id !== Number(event.target.parentNode.id),
        );
        toDoList = newArray;
        displayElements(newArray);
    }
};

const clearField = () => {
    while (casesWrapper.firstChild) {
        casesWrapper.removeChild(casesWrapper.firstChild);
    }
};

const sort = () => {
    const sortByAlphabeticalOrder = (array) => {
        array.sort((a, b) => {
            if (a.text < b.text) return -1;
            if (a.text > b.text) return 1;
            return 0;
        });
    };

    const sortByDate = (array) => {
        array.sort((a, b) => {
            if (a.createDate < b.createDate) return -1;
            if (a.createDate > b.createDate) return 1;
            return 0;
        });
    };

    switch (sortButton.selectedIndex) {
        case 1:
            //sort A-Z
            sortByAlphabeticalOrder(toDoList);
            displayElements(toDoList);
            break;
        case 2:
            //sort Z-A
            sortByAlphabeticalOrder(toDoList);
            displayElements(toDoList.reverse());
            break;
        case 3:
            //sort by date in ascending order
            sortByDate(toDoList);
            displayElements(toDoList);
            break;
        case 4:
            //sort by date in ascending order
            sortByDate(toDoList.reverse());
            displayElements(toDoList.reverse());
            break;
        default:
            displayElements(toDoList);
    }
};

function displayElements(array) {
    clearField();

    array.forEach((toDoItem) => {
        const createCasesContainer = document.createElement("div");
        const createCases = createCasesContainer.appendChild(document.createElement("p"));
        const createDate = createCasesContainer.appendChild(document.createElement("p"));
        const createCross = createCasesContainer.appendChild(document.createElement("span"));

        createCasesContainer.className = "cases-container";
        createCasesContainer.id = toDoItem.id;
        createCases.className = "cases-text";
        createDate.className = "cases-text";
        createCross.className = "cases-cross";
        createCases.innerHTML = toDoItem.text;
        createDate.innerHTML = toDoItem.createDate;
        createCross.innerHTML = "X";
        casesWrapper.appendChild(createCasesContainer);

        createCasesContainer.addEventListener("click", removeTodo);
        createCasesContainer.addEventListener("click", checkedTodo);
        sortButton.addEventListener("click", sort);
    });
}
