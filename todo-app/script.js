const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const remainingCount = document.getElementById("remainingCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

function addTask(){

    const taskText = taskInput.value.trim();

    // Prevent empty task
    if(taskText === ""){
        alert("Task cannot be empty!");
        return;
    }

    // Prevent duplicates
    const duplicate = tasks.some(task =>
        task.text.toLowerCase() === taskText.toLowerCase()
    );

    if(duplicate){
        alert("Task already exists!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    else if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
            </div>

            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        const editBtn = li.querySelector(".edit-btn");

        editBtn.addEventListener("click", () => {
            editTask(task.id, li);
        });

        taskList.appendChild(li);
    });

    updateRemainingCount();
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function editTask(id, li){

    const task = tasks.find(task => task.id === id);

    const span = li.querySelector("span");

    const oldText = task.text;

    const input = document.createElement("input");

    input.type = "text";

    input.value = oldText;

    input.className = "edit-input";

    span.replaceWith(input);

    input.focus();

    input.addEventListener("keypress", function(e){

        if(e.key === "Enter"){

            const newText = input.value.trim();

            if(newText === ""){
                alert("Task cannot be empty!");
                return;
            }

            task.text = newText;

            saveTasks();

            renderTasks();
        }
    });

    input.addEventListener("blur", () => {

        const newText = input.value.trim();

        if(newText !== ""){
            task.text = newText;
        }

        saveTasks();

        renderTasks();
    });
}

function updateRemainingCount(){

    const remainingTasks = tasks.filter(task => !task.completed);

    remainingCount.textContent = remainingTasks.length;
}

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));
}