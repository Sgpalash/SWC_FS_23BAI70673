let add = document.getElementById("add");
let div_list = document.getElementById("list");
let input = document.getElementById('input');
let list =[];

function render()
{
    div_list.innerHTML="";
    list.forEach((item,index)=>{
        let p = document.createElement("p");
        p.innerHTML=`${item}
                                <button data-index = "${index}">Delete</button>`;
        div_list.appendChild(p);
    })
}

div_list.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON")
    {
        let index = e.target.dataset.index;
        list.splice(index,1);
        render();
    }
});

add.onclick = function()
{
    if(input.value.trim()=="")
    {
        alert("Text cant be empty");
    }
    else
    {
        list.push(input.value);
        render();
        input.value="";
    }
}
