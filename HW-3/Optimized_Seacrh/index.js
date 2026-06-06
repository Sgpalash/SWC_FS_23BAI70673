let i = document.getElementById('taskInput');
let a_btn = document.getElementById('addTaskButton');
let tl = document.getElementById('taskList');
let d = document.getElementById("div");

let Search = document.createElement("input");
let S_btn = document.createElement("button");

let timer; 
let item_Arr=[];

Search.placeholder="Search Task";
S_btn.textContent="Search";
S_btn.style.marginLeft="3px";
a_btn.style.marginRight="5px";

Search.addEventListener("input", function(){
    clearTimeout(timer);
    timer=setTimeout(()=>{
        const it = item_Arr.filter(item_Arr=>{
            return item_Arr.toLowerCase().startsWith(Search.value.toLowerCase());
        });

        if(it.length===0)
        {
            S_btn.onclick=function()
            {
                alert("No Results Found");
                Search.value="";
            }
        }
        else{
            render(it);
        }
    },300)

});

function render(list){

    if(list.length>0)
    {
        a_btn.after(S_btn);
         a_btn.after(Search);
    }
    else{
        S_btn.remove();
        Search.remove();
    }
    tl.innerHTML="";
    for(let item of list){
        let l = document.createElement("li");
        l.textContent=item;
        let del = document.createElement("button");
        del.textContent="Delete";
        del.style.marginLeft="10px";
        del.style.marginBottom="5px";

        del.onclick= function(event){
            // const b = event.target;
            // const parent = b.parentElement;
            // tl.removeChild(parent);
            item_Arr.splice(item_Arr.indexOf(item),1);
            render(item_Arr);
        }
        tl.appendChild(l);
        l.appendChild(del);
    }
}


a_btn.onclick = function(){
    if(i.value.trim()==="")
    {
        alert("Enter valid task");
    }
    else
    {
        item_Arr.push(i.value);
        render(item_Arr);
    }
    i.value="";
}