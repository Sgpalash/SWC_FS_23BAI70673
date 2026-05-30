console.log("HELLO");

const l = document.getElementById('data');
const x = document.getElementById('DNS');
const y = document.getElementById('disp');

let arr = [];

function render() {

    y.innerHTML = `
        <p>Write Your Task</p>
        <input type="text" placeholder="enter" id="data">
        <button id="DNS">Add</button>
    `;

    arr.forEach(function(task, index) {

        let div = document.createElement("div");

        let cb = document.createElement("input");
        cb.type = "checkbox";

        let lb = document.createElement("label");
        lb.textContent = task;

        cb.onclick = function () {

            if(cb.checked) {
                lb.style.textDecoration = "line-through";
            }
            else {
                lb.style.textDecoration = "none";
            }
        };

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = function () {

            let newTask = prompt("Edit task", arr[index]);

            if(newTask !== null && newTask.trim() !== "") {
                arr[index] = newTask;
                render();
            }
        };

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = function () {

            arr.splice(index, 1);
            render();
        };

        div.appendChild(cb);
        div.appendChild(lb);
        div.appendChild(editBtn);
        div.appendChild(delBtn);

        y.appendChild(div);
    });
    document.getElementById('DNS').onclick = addTask;
}

function addTask() {

    let value = document.getElementById('data').value;

    if(value.trim() !== "") {
        arr.push(value);
        render();
    }
}

x.onclick = addTask;