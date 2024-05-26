document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

//to add new task
function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
    var task = taskInput.value;
    var li = document.createElement('li');
    li.innerHTML = `<span class="task">${task}</span>
    <span class="tick" onclick="toggleTaskCompletion(this)">&#10004;</span>
                        <span class="edit" onclick="openEditModal(this)">Edit</span>
                        <span class="delete" onclick="deleteTask(this)">X</span>
                        `;
    taskList.appendChild(li);
    saveTask(task);
    taskInput.value = '';
    document.getElementById('taskList').style.display='block';
    document.getElementById("error").style.display='none';
  } else {
    document.getElementById("error").textContent="Please enter a task!";
  }
}

function toggleTaskCompletion(element) {
  var taskText = element.parentElement.querySelector('.task');
  if (taskText.style.textDecoration === 'line-through') {
    taskText.style.textDecoration = 'none';
  } else {
    taskText.style.textDecoration = 'line-through';
  }
}

//to edit task
function openEditModal(element) {
  var taskText = element.parentElement.querySelector('.task');
  var editInput = document.getElementById('editTaskInput');
  editInput.value = taskText.textContent;
  editInput.dataset.taskId = taskText.textContent;
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('taskList').style.display='none';
}

function saveEditedTask() {
  var editInput = document.getElementById('editTaskInput');
  var newTask = editInput.value.trim();
  var oldTask = editInput.dataset.taskId;
  if (newTask !== '' && newTask !== oldTask) {
    updateTask(oldTask, newTask);
    closeEditModal();
  }
}

//cancle button
function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('taskList').style.display='block';
}

function deleteTask(element) {
  var task = element.parentElement.querySelector('.task').textContent;
  element.parentElement.remove();
  removeTask(task);
}

function saveTask(task) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//delete task
function removeTask(task) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function updateTask(oldTask, newTask) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var index = tasks.indexOf(oldTask);
  if (index !== -1) {
    tasks[index] = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskInUI(oldTask, newTask);
  }
}

function updateTaskInUI(oldTask, newTask) {
  var taskList = document.getElementById('taskList');
  var taskItems = taskList.getElementsByTagName('li');
  for (var i = 0; i < taskItems.length; i++) {
    var taskText = taskItems[i].querySelector('.task');
    if (taskText.textContent === oldTask) {
      taskText.textContent = newTask;
      break;
    }
  }
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskList = document.getElementById('taskList');

  tasks.forEach(function (task) {
    var li = document.createElement('li');
    li.innerHTML = `<span class="task">${task}</span>
        <span class="tick" onclick="toggleTaskCompletion(this)">&#10004;</span>
                        <span class="edit" onclick="openEditModal(this)">Edit</span>
                        <span class="delete" onclick="deleteTask(this)">X</span>
                        `;
    taskList.appendChild(li);
  });
}