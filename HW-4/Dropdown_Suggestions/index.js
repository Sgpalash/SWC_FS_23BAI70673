let i = document.getElementById('taskInput');
let a_btn = document.getElementById('addTaskButton');
let tl = document.getElementById('taskList');
let d = document.getElementById("div");

let searchWrapper = document.createElement("div");
searchWrapper.style.display = "inline-block";
searchWrapper.style.position = "relative";

let Search = document.createElement("input");
let S_btn = document.createElement("button");

let dropdown = document.createElement("ul");
dropdown.style.position = "absolute";
dropdown.style.top = "100%";
dropdown.style.left = "0";
dropdown.style.width = "100%";
dropdown.style.backgroundColor = "white";
dropdown.style.border = "1px solid #ccc";
dropdown.style.listStyle = "none";
dropdown.style.padding = "0";
dropdown.style.margin = "0";
dropdown.style.zIndex = "10";
dropdown.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";

let timer; 
let item_Arr = []; 

Search.placeholder = "Search Task";
S_btn.textContent = "Search";
S_btn.style.marginLeft = "3px";
a_btn.style.marginRight = "5px";

searchWrapper.appendChild(Search);
searchWrapper.appendChild(dropdown);

Search.addEventListener("input", function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        const query = Search.value.toLowerCase().trim();
        dropdown.innerHTML = "";

        if (query === "") {
            return;
        }

        const it = item_Arr.filter(item => {
            return item.toLowerCase().startsWith(query);
        });

        if (it.length > 0) {
            it.forEach(item => {
                // FIX 2: Consistently use 'li' as the variable name
                const li = document.createElement("li");
                li.textContent = item;
                li.style.padding = "5px";
                li.style.cursor = "pointer";
                li.style.borderBottom = "1px solid #eee";

                li.onmouseover = () => {
                    li.style.backgroundColor = "#f0f0f0";
                };

                li.onmouseout = () => {
                    li.style.backgroundColor = "white";
                };

                li.onclick = function() {
                    Search.value = item;
                    dropdown.innerHTML = "";
                    render([item]);    
                };
                dropdown.appendChild(li);
            }); 
        } 
    }, 300);
});

document.addEventListener("click", function(e) {
    if (!searchWrapper.contains(e.target)) {
        dropdown.innerHTML = "";
    }
});

function render(list) {
    
    if (item_Arr.length > 0) { 
        a_btn.after(S_btn);
        a_btn.after(searchWrapper);
    } else {
        S_btn.remove();
        searchWrapper.remove();
        Search.value = "";
    }
    
    tl.innerHTML = "";
    for (let item of list) {
        let l = document.createElement("li");
        l.textContent = item;
        let del = document.createElement("button");
        del.textContent = "Delete";
        del.style.marginLeft = "10px";
        del.style.marginBottom = "5px";

        del.onclick = function(event) {
            item_Arr.splice(item_Arr.indexOf(item), 1);
            Search.value = "";
            render(item_Arr);
        };
        tl.appendChild(l);
        l.appendChild(del);
    }
}

a_btn.onclick = function() {
    if (i.value.trim() === "") {
        alert("Enter valid task");
    } else {
        item_Arr.push(i.value);
        render(item_Arr);
    }
    i.value = "";
};