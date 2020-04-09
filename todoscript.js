const tableTaskList = document.getElementById("tableTaskList");
let i = 0;

const addNewTask = (value, skipAddingToLocalStorage, tableId) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    const checkboxDiv = document.createElement("div");
    checkboxDiv.setAttribute("class", "custom-control custom-checkbox");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("class", "custom-control-label");
    checkboxLabel.setAttribute("for", "customCheck" + i);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "custom-control-input");
    checkbox.setAttribute("id", "customCheck" + i);

    const toggle = () => {
        tr.classList.toggle("completed");
    };
    checkbox.addEventListener("click", toggle);

    const taskNumber = document.createElement("td");
    taskNumber.innerText = i;

    const title = document.createElement("td");
    title.innerText = value;

    const remove = document.createElement("td");
    remove.setAttribute("id", "delete");
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';

    const removeItem = () => {
        tr.parentNode.removeChild(tr);
        localStorage.removeItem(keysArray[taskNumber.innerText]);
    };
    remove.addEventListener("click", removeItem);
    
    tableTaskList.appendChild(tr);
    tr.appendChild(taskNumber);
    tr.appendChild(title);
    tr.appendChild(td);
    td.appendChild(checkboxDiv);
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(checkboxLabel);
    tr.appendChild(remove);

    if (tableId === objTable) {
        objTable.appendChild(tr);
        i++;
    }
    if (!skipAddingToLocalStorage) {
        localStorage.setItem(createGuid(), title.innerText);
        i++;
    }
};

const objTable = document.getElementById("list");
var keysArray = Object.keys(localStorage);

for (var j = 0; j < keysArray.length; j++) {
    addNewTask(localStorage.getItem(keysArray[j]), true, objTable);
};

const taskinput = document.getElementById("taskinput");
const taskButton = document.getElementById("taskButton");

const AddDeleteValue = (event) => {
    if ((event.code === "Enter" || event.button === 0) && taskinput.value.length !== 0) {
        addNewTask(taskinput.value);
        taskinput.value = "";
        keysArray = Object.keys(localStorage);
    } else if (taskinput.value.length === 0 && (event.code === "Enter" || event.button === 0)) {
        $('#exampleModal').modal('show');
    }
};

taskinput.addEventListener("keyup", AddDeleteValue);
taskButton.addEventListener("mouseup", AddDeleteValue);

// Custom GUID generator
const createGuid = () => {  
    const S4 = () => {  
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    };
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
};

const guid = createGuid();