let email = document.getElementById("email");
let pass = document.getElementById("password");
let btn = document.getElementById("btn");
let small = document.getElementById("p_Error");

let gmail = true;


btn.onclick=function()
{
    gmail=true;
    small.textContent=""
    let special = /[@*$%^&()!]/.test(pass.value);
    let U_char = /[A-Z]/.test(pass.value);
    let l_char = /[a-z]/.test(pass.value);
    let num = /[0-9]/.test(pass.value);
    if(email.value.trim()==="" || !email.value.includes("@") || !email.value.includes("."))
    {
        alert("Please enter a valid Email");
        gmail=false;
    }
    if(special && U_char && l_char && num && gmail && pass.value.length>=8)
    {
        email.readOnly=true;
        pass.readOnly=true;
        btn.disabled=true;
    }
    else{
        small.style.color="red";
        small.textContent="Error";
        if(!special)
        {
            alert("Please Enter a special character such as @*$%^&()!");
        }

        else if(!U_char)
        {
             alert("Please Enter a Atleast one uppercase character");
        }

        else if(!l_char)
        {
             alert("Please Enter a Atleast one lowercase character");
        }

        else if(!num)
        {
             alert("Please Enter a Atleast one number from 0-9");
        }
        else{
            alert("password should be atleast 8 character long");
        }
    }

};