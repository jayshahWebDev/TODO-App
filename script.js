//ARRAY FOR ALL TASKS
let taskList = [
  { id: 1, detail: "one" },
  { id: 2, detail: "two" },
  { id: 3, detail: "three" },
  { id: 4, detail: "four" },
];

let taskListSection = document.querySelector(".taskListSection");

// ADD TASK FUNCTION
let addTask = () => {
  let taskInputValue = document.querySelector(".taskInput").value;
  taskList.push({ id: Date.now(), detail: taskInputValue });
  renderTaskList();
};

//FUNCTION FOR LOOP ON TASKLIST ARRAY
let renderTaskList = () => {
  taskListSection.innerHTML = "";
  console.log("inside render list");

  taskList.forEach((task, index) => {
    let taskListDiv = document.createElement("div");
    taskListDiv.className = "taskList";
    taskListDiv.setAttribute("id", task.id);

    let taskDetailTag = document.createElement("p");
    taskDetailTag.className = "taskDetail";
    taskDetailTag.textContent = task.detail;

    let editButton = document.createElement("a");
    editButton.className = "editBtn";
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    let removeButton = document.createElement("a");
    removeButton.className = "deleteBtn";
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    taskListDiv.append(taskDetailTag, editButton, removeButton);
    taskListSection.append(taskListDiv);
  });
};

let handleEvent = (event) => {
  let btnName = event.target.parentNode.getAttribute("class");
  let taskId = event.target.parentNode.parentNode.getAttribute("id");
  let taskValue =
    event.target.parentNode.parentNode.querySelector(".taskDetail").innerText;

  console.log("btnName::", btnName);

  //EDIT TASK FUNCTION
  if (
    event &&
    event.target &&
    event.target.parentNode &&
    btnName == "editBtn" &&
    taskId &&
    taskValue
  ) {
    console.log("inside editbtn");
    let editTaskDiv = document.querySelector(".modalBox");
    let editTaskInput = document.querySelector(".editModalInput");
    let mainDiv = document.querySelector(".mainDiv");
    editTaskDiv.style.display = "flex";
    editTaskDiv.style.justifyContent = "center";
    mainDiv.style.opacity = "0.4";
    editTaskInput.value = taskValue;
    editTaskInput.focus();

    let cancelButton = document.querySelector(".cancelBtn");
    cancelButton.addEventListener("click", () => {
      editTaskDiv.style.display = "none";
      mainDiv.style.opacity = "1";
    });
    let saveButton = document.querySelector(".saveBtn");
    saveButton.addEventListener("click", () => {
      taskList = taskList.filter((task) => {
        console.log("task::", task);
        if (task.id == taskId) {
          console.log("inside if statement");
          task.detail = editTaskInput.value;
          taskValue = editTaskInput.value;
          editTaskDiv.style.display = "none";
          mainDiv.style.opacity = "1";
          console.log("array::", taskList);
          renderTaskList();
        }
      });
    });
  } else if (
    event &&
    event.target &&
    event.target.parentNode &&
    btnName == "deleteBtn" &&
    taskId
  ) {
    // REMOVE TASK FUNCTION
    console.log("inside deletebtn");
    console.log("id::", taskId);
    taskList = taskList.filter((task) => {
      console.log("tsk::", task);
      return task.id != taskId;
    });
    console.log("taskList::", taskList);
    renderTaskList();
  }
};

renderTaskList();
