let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
let indexnumber = document.getElementById("indexnumber");

document.addEventListener("DOMContentLoaded", function () {
    displayTask();

    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
});

function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            completed: false,  // Remplacement de "disabled" par "completed"
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTask();
    }
}

function deleteAllTasks() {
    todo = [];
    index2=0;
    saveToLocalStorage();
    displayTask();
}

function displayTask() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const taskElement = document.createElement("div");

        taskElement.classList.add("todo-container");

        taskElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.completed ? "checked" : ""}>
            <p id="todo-${index}" class="${item.completed ? "disabled" : ""}" onclick="editTask(${index})">
                ${item.text}
            </p>
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        `;

        taskElement.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });

        todoList.appendChild(taskElement);
    });
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTask();
}

function toggleTask(index) {
    todo[index].completed = !todo[index].completed; // Permet de cocher/décocher
    saveToLocalStorage();
    displayTask();
}
