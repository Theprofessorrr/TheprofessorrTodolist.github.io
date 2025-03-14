

let todo= JSON.parse(localStorage.getItem("todo")) || [];
const todoInput= document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded",function(){
    displayTask();

    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event){
        if(event.key==="Enter"){
            event.preventDefault();
            addTask();

        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTask();
});
function addTask(){
    const newTask = todoInput.value.trim();
    if(newTask!==""){
        todo.push({
            text:newTask,
            disabled: false,
        });
        saveToLocalStorage();
        
        todoInput.value="";
        displayTask();
}
}
function deleteAllTasks(){
    todo=[];
    saveToLocalStorage();
    displayTask();

}
function displayTask(){
    todoList.innerHTML="";
    todo.forEach((item, index)=> {
        const p = document.createElement("p");
        p.innerHTML=`
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "disabled" : ""}>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}"
        onclick="editTask(${index})">${item.text}</p>
        <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", ()=>{
            toggleTask(index);
        todoInput.value = "";
        });
        todoList.appendChild(p);
        
    });

}
function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));


}
function deleteTask(index){
    todo.splice(index,1);
    displayTask();
}
function toggleTask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();
    displayTask();

}