let z = document.createElement('button');
z.textContent=0;
z.onclick=function()
{
    let a = Number(z.textContent);
    z.textContent=a+1;
}

document.body.appendChild(z);