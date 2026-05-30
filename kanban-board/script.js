const tasks =
document.querySelectorAll(".task");

const columns =
document.querySelectorAll(".task-list");

let draggedTask = null;


// Drag Start

tasks.forEach(task => {

    task.addEventListener("dragstart", () => {

        draggedTask = task;

        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {

        task.classList.remove("dragging");
    });

});


// Drop Zones

columns.forEach(column => {

    column.addEventListener("dragover", (e) => {

        e.preventDefault();
    });

    column.addEventListener("drop", () => {

        column.appendChild(draggedTask);
    });

});