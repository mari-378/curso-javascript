const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filters = document.querySelectorAll(".filters button");

let filter = "all";

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
   
  if (filteredTasks.lenght === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.classList.add("empty-message");

    if (tasks.lengtht === 0) {
        emptyMsg.textContent = "Nenhuma tarefa adicionada."
    } else if (filter === "pending"){
        emptyMsg.textContent = "Nenhuma tarefa pendente."
    } else if (filter === "completed") {
        emptyMsg.textContent = "Nenhuma tarefa completa."
    } else {
        emptyMsg.textContent = "Nenhuma tarefa encontrada."
    };
    
    task.List.appendChild(emptyMsg);
    return;

  }
  
    filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
        <div class="actions-group">
            <button class="edit">✏️</button>
            <button class="remove">🗑️</button>
        </div>
    `;

    const input = li.querySelector("input");
    const edit = li.querySelector(".edit");
    const remove = li.querySelector(".remove");

    input.addEventListener("change", () => {
      li.classList.toggle("completed");
      task.completed = input.checked;
      renderTasks();
    });

    edit.addEventListener("click", () => {
      const span = li.querySelector("span");
      span.contentEditable = true;
      span.focus();

      span.addEventListener("blur", () => {
        span.contentEditable = false;
        task.text = span.textContent.trim();
      });
    });

    remove.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      renderTasks();
    });
    taskList.appendChild(li);
  });

  updateCount();
}

function updateCount() {
    const pending = tasks.filter((t) => !t.completed).length;
    taskCount.textContent = `${pending} tarefas pendentes`;
};

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return; 

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    taskInput.value = "";
    taskInput.focus();

    renderTasks();
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addTaskBtn.click();
});

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.dataset.filter;
        renderTasks();     
    });
}); 

clearCompletedBtn.addEventListener("click", () => {
    const filtered = tasks.filter((task) => !task.completed);
    tasks.splice(0, tasks.length, ...filtered);
    renderTasks();
});



document.addEventListener("DOMContentLoaded", renderTasks);
