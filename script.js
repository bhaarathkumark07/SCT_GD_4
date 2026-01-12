let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime");

    if (taskInput.value === "") return alert("Please enter a task!");

    let task = {
        text: taskInput.value,
        time: taskTime.value,
        completed: false
    };

    saveTask(task);
    renderTask(task);

    taskInput.value = "";
    taskTime.value = "";
}

function renderTask(task) {
    let li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    let taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
        <strong>${task.text}</strong>
        <div class="task-time">${task.time || "No date set"}</div>
    `;

    let buttons = document.createElement("div");
    buttons.className = "task-buttons";

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.className = "complete";
    completeBtn.onclick = () => toggleComplete(li, task);

    let editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(task, li);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(li, task);

    buttons.append(completeBtn, editBtn, deleteBtn);
    li.append(taskInfo, buttons);
    taskList.appendChild(li);
}

function toggleComplete(li, task) {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    updateStorage();
}

function editTask(task, li) {
    let newText = prompt("Edit task:", task.text);
    if (newText) {
        task.text = newText;
        li.querySelector("strong").textContent = newText;
        updateStorage();
    }
}

function deleteTask(li, task) {
    li.remove();
    removeFromStorage(task);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}

function updateStorage() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("strong").textContent,
            time: li.querySelector(".task-time").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
