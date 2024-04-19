const firstName = "Melbienri"
const lastName = "Gabitan"
const age = 24
const birthDate = "April 19, 1999"

document.getElementById("fullName").innerText = firstName + " " + lastName
document.getElementById("age").innerText=age
document.getElementById("bdate").innerText=birthDate

function changeProfile(){
    let image = document.getElementById('profile');
    if(image.src.match("image")){   
        image.src = "profile.jpg"
    }
        else{
            image.src = "image.jpg"
        }
    }
function checkBirthDate(){
    const bdate = new Date(birthDate)
    const nowDate = new Date();
    const checkdate = bdate.getMonth() + " " + bdate.getDate();
    const checknowDate = nowDate.getMonth() + " " + nowDate.getDate();
    
    if (checkdate === checknowDate) {
        return document.getElementById('date').innerText="Happy Birthday!"
    } else 
        return document.getElementById('date').innerText="Today is "+ nowDate.toDateString() + ". It's not your birthday :("
    
}