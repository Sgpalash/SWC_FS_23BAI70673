let t=document.getElementById("text");
let c=document.getElementById("count");
let s=document.getElementById("Sumbit");
let limit = 200 * 0.8;

t.addEventListener("input",function()
{
    c.textContent=200-t.value.length;
    if(t.value.length>limit)
    {
        c.style.backgroundColor="red";
    }
    if(t.value.length<limit)
    {
        c.style.backgroundColor="white";
    }
})

s.onclick=function()
{
    t.value="";
}