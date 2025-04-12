"use strict";

let itemToDelete = null;
let lastDeletedItem = null;
let lastDeletedIndex = -1;
let lastDeletedItemList = null;

function addNewList() {
  // Checking input field
  const listNameInput = document.getElementById("new-list-name");
  const listName = listNameInput.value.trim();
  if (!listName) {
    alert("Podaj nazwę listy.");
    return;
  }

  // Creating the list
  const listId = `list-${Date.now()}`;
  const container = document.getElementById("right-panel");

  const listWrapper = document.createElement("div");
  listWrapper.className = "list-wrapper";

  const header = document.createElement("h2");
  header.textContent = listName;
  header.className = "collapsible";
  header.onclick = function () {
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  };

  const list = document.createElement("ul");
  list.id = listId;
  list.style.display = "block";

  listWrapper.appendChild(header);
  listWrapper.appendChild(list);
  container.appendChild(listWrapper);

  // Adding the list to selector options
  const selector = document.getElementById("list-selector");
  const option = document.createElement("option");
  option.value = listId;
  option.textContent = listName;
  selector.appendChild(option);

  listNameInput.value = "";
}

function addToList() {
  // Checking input field and selected list
  const taskInput = document.getElementById("item-input");
  const listSelector = document.getElementById("list-selector");

  const taskTextVal = taskInput.value.trim();
  const selectedListId = listSelector.value;

  if (!taskTextVal) {
    alert("Pole zadania jest puste.");
    return;
  }

  if (!selectedListId) {
    alert("Wybierz listę.");
    return;
  }

  // Creating the task
  const list = document.getElementById(selectedListId);
  const newItem = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = taskTextVal;
  taskText.classList.add("task-text");

  const dateSpan = document.createElement("span");
  dateSpan.className = "date";

  // Creating the task's delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    itemToDelete = newItem;
    document.getElementById("delete-modal").style.display = "block";
  };

  newItem.appendChild(taskText);
  newItem.appendChild(dateSpan);
  newItem.appendChild(deleteBtn);

  // Marking task as done
  newItem.onclick = function () {
    taskText.classList.toggle("done");
    dateSpan.textContent = taskText.classList.contains("done")
      ? ` (zrobione: ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()})`
      : "";
  };

  list.appendChild(newItem);
  taskInput.value = "";
}

function filterTasks() {
  // Getting filter input
  const query = document.getElementById("filter-input").value;
  const caseSensitive = document.getElementById("case-sensitive").checked;

  const allTasks = document.querySelectorAll("#right-panel li");

  // Filtering tasks based on filter input
  allTasks.forEach(task => {
    const text = task.querySelector(".task-text").textContent;
    
    let matches;
    if (caseSensitive) {
      matches = text.includes(query);
    } else {
      matches = text.toLowerCase().includes(query.toLowerCase());
    }

    if (matches) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Handling tasks deletion
  document.getElementById("confirm-delete").onclick = () => {
    if (itemToDelete) {
      const parentList = itemToDelete.parentElement;
      lastDeletedItem = itemToDelete;
      lastDeletedIndex = Array.from(parentList.children).indexOf(itemToDelete);
      lastDeletedItemList = parentList;

      document.getElementById("last-deleted").textContent =
        `Ostatnio usunięte: ${itemToDelete.querySelector(".task-text").textContent}`;
      document.getElementById("undo-delete").style.display = "block";

      itemToDelete.remove();
      itemToDelete = null;
    }
    document.getElementById("delete-modal").style.display = "none";
  };

  // Cancelling deletion
  document.getElementById("cancel-delete").onclick = () => {
    itemToDelete = null;
    document.getElementById("delete-modal").style.display = "none";
  };

  // Undoing deletion
  document.getElementById("undo-delete").onclick = () => {
    if (lastDeletedItem && lastDeletedItemList) {
      if (lastDeletedIndex === -1 || lastDeletedIndex >= lastDeletedItemList.children.length) {
        lastDeletedItemList.appendChild(lastDeletedItem);
      } else {
        lastDeletedItemList.insertBefore(lastDeletedItem, lastDeletedItemList.children[lastDeletedIndex]);
      }

      document.getElementById("last-deleted").textContent = "Brak usuniętych zadań.";
      document.getElementById("undo-delete").style.display = "none";
      lastDeletedItem = null;
      lastDeletedIndex = -1;
      lastDeletedItemList = null;
    }
  };

  // Dynamic filtering based on user interactions with filter inputs
  document.getElementById("filter-input").addEventListener("input", filterTasks);
  document.getElementById("case-sensitive").addEventListener("change", filterTasks);
});