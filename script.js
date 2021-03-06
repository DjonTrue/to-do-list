const inputText = document.getElementById("inputText");
const inputDate = document.getElementById("inputDate");
const createElement = document.getElementById("inputSubmit");
const casesWrapper = document.getElementById("casesWrapper");
const sortButton = document.getElementById("sort-select");
const searchText = document.getElementById("search");
const searchSubmit = document.getElementById("searchSubmit");
const searchDate = document.getElementById("searchDate");
const searchReset = document.getElementById("searchReset");
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
    console.log(toDoList);
};

const removeTodo = (event) => {
    if (event.target.className === "cases-cross") {
        const newArray = toDoList.filter(
            (todoItem) => todoItem.id !== Number(event.target.parentNode.id),
        );
        toDoList = newArray;
        displayElements(toDoList);
    }
};

const clearField = () => {
    while (casesWrapper.firstChild) {
        casesWrapper.removeChild(casesWrapper.firstChild);
    }
};

const sortArray = (array, sortFieldName) => {
    array.sort((a, b) => {
        if (a[sortFieldName] < b[sortFieldName]) return -1;
        if (a[sortFieldName] > b[sortFieldName]) return 1;
        return 0;
    });
};

const sort = () => {
    switch (sortButton.value) {
        case "Sort A-Z":
            sortArray(toDoList, "text");
            displayElements(toDoList);
            break;
        case "Sort Z-A":
            sortArray(toDoList, "text");
            displayElements(toDoList.reverse());
            break;
        case "Sort by date":
            sortArray(toDoList, "createDate");
            displayElements(toDoList);
            break;
        case "Reverse date":
            sortArray(toDoList, "createDate");
            displayElements(toDoList.reverse());
            break;
        default:
            displayElements(toDoList);
    }
};

const searchTodo = () => {
    if (!!searchText.value && !!searchDate.value) {
        searchResult = toDoList.filter(
            (item) => item.text.includes(searchText.value) && item.createDate === searchDate.value,
        );
    } else if (!!searchText.value && !searchDate.value) {
        searchResult = toDoList.filter((item) => item.text.includes(searchText.value));
    } else if (!searchText.value && !!searchDate.value) {
        searchResult = toDoList.filter((item) => item.createDate === searchDate.value);
    }

    if (searchResult.length === 0) {
        casesWrapper.innerHTML = "Nothing was found! Please click reset.";
    } else {
        displayElements(searchResult);
    }

    searchReset.addEventListener("click", () => {
        displayElements(toDoList);
        sortButton.options[0].selected = true;
    });

    searchText.value = "";
    searchDate.value = "";
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
        searchSubmit.addEventListener("click", searchTodo);
    });

    if (array === toDoList) {
        localStorage.setItem("toDoElements", JSON.stringify(array));
    }
}

window.onload = () => {
    toDoList = JSON.parse(localStorage.getItem("toDoElements")) || [];
    displayElements(toDoList);
};
