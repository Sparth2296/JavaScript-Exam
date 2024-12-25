document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const priorityFilter = document.getElementById("priority-filter");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const addTask = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    
    if (!title || !dueDate) {
      alert("Task title and due date are required!");
      return;
    }


    const task = {
      id: Date.now(), 
      title,
      description,
      dueDate,
      priority,
    };

    tasks.push(task); 
    saveTasks(); 
    displayTasks(); 
    taskForm.reset(); 
  };

  // Function to display tasks
  const displayTasks = (filter = "all") => {
    taskList.innerHTML = ""; 
    const filteredTasks = tasks.filter((task) =>
      filter === "all" ? true : task.priority === filter
    );

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";
      li.innerHTML = `
        <div class="details">
          <strong> Your Task : ${task.title}</strong> - ${task.description} <br>
          <strong>Date :</strong> ${task.dueDate} <br>
          <strong> Priority :</strong> ${task.priority}
        </div>
        <div class="actions">
          <button onclick="editTask(${task.id})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      taskList.appendChild(li);
    });
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  window.deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id); 
    saveTasks(); 
    displayTasks(); 
  };

  window.editTask = (id) => {
    const task = tasks.find((task) => task.id === id); 

    if (task) {
      document.getElementById("title").value = task.title;
      document.getElementById("description").value = task.description;
      document.getElementById("due-date").value = task.dueDate;
      document.getElementById("priority").value = task.priority;

      deleteTask(id);
    }
  };

  // Event listener for the priority filter
  priorityFilter.addEventListener("change", (e) => {
    displayTasks(e.target.value);
  });

  // Event listener for the task form submission
  taskForm.addEventListener("submit", addTask);

  displayTasks();
});