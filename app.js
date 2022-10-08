
// it is for increse numbers of params 
let increaseParam = 0;

// now we give a function which returs a dom element for increasing params 

function increaseparamstring(string) {
    // first we create a new div because all elements are append in it so we can easily iterate in future 

    let newparamdiv = document.createElement('div')
    newparamdiv.innerHTML = string;
    return newparamdiv.firstElementChild;
}


// first we show when we are in content type and press  json so request json box will be show and if press custom parameter so parameter will show.  

let requestJsonBox = document.getElementById("requestJsonBox")
let parameterbox = document.getElementById("parameterbox")

// // in start we hide parambox becasue by default jsonbox clicked 
parameterbox.style.display = "none";

// first we add events on radio buttons json and custom
// json radio button add event 
let jsonradio = document.getElementById("jsonradio")

jsonradio.addEventListener("click", () => {

    // when we block any element so it will show when we none it so it will hide  
    // here we give flex because in block some bracket has been disarrange.  
    requestJsonBox.style.display = "flex";
    // we hide the custom parameter box
    parameterbox.style.display = "none";

})

// custom radio button add event
let customradio = document.getElementById("customradio")

customradio.addEventListener("click", () => {
    // here we hide requestJsonBox and show our  parameterbox
    requestJsonBox.style.display = "none";

    parameterbox.style.display = "block";
})



// now we have to make more parameters when user clicks on + button 

let addParam = document.getElementById("addParam")

// we add event listener on this  + butn and help of generator we create more parameter boxes and when we press '-' button that param will delete. 
addParam.addEventListener("click", (e) => {
    e.preventDefault();
    let param = document.getElementById("Param")


    let string = `<form class="row g-2 my-3">                                
                            <label for="parameter" class="col-sm-2 col-form-label">Parameter ${increaseParam + 2} </label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="paramkey${increaseParam + 2}" placeholder="Enter key ${increaseParam + 2} ">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="paramvalue${increaseParam + 2}" placeholder="Enter Value ${increaseParam + 2}">
                            </div>
                            <div class="col-md-1">
                            <button  class="btn btn-primary deleteparam ">-</button>
                            </div>
                    </form>`
    increaseParam++;

    let newincreasefun = increaseparamstring(string);
    // this function returns all parameters box which we add by press + button 

    // we add this function end of this param which 
    param.appendChild(newincreasefun)

    // now we remove element when we press on - button 

    let deleteparam = document.getElementsByClassName("deleteparam")
    for (remove of deleteparam) {
        // now we access all button which are in all parameters that we make 
        remove.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target.parentElement.parentElement.remove())
        })
    }


})



// now we set submit button 
let submitbtn = document.getElementById("submitrequest")

// when we submit button then url will be fecth data from api so we have to use fetch api 

submitbtn.addEventListener("click", () => {
    // first we change the placeholder text in responsebox 
    let responsetext = document.getElementById("responseJsonText")
    responsetext.innerText = "Please wait your request is in process...."



    // now we take url value AND REQUESTTYPE AND CONTENT TYPE VALUES .
    let url = document.getElementById("url").value
    let requestType = document.querySelector('input[name="Request Type"]:checked').value;
    let contentType = document.querySelector('input[name="Content Type"]:checked').value;


    // now we take data from contentType means json or parameters 
    if (contentType == "Custom Parameters") {
        data = {};
        // now we take parameters data which we gave key and valuess 

        for (i = 0; i < increaseParam + 1; i++) {
            // if any param delete so that will undefined so if not undefined then it work 
            // we give i +1 because at first i = 0 so we change it in 1 
            if (document.getElementById("paramkey" + (i + 1)) != undefined) {
                let key = document.getElementById("paramkey" + (i + 1)).value
                let value = document.getElementById("paramvalue" + (i + 1)).value
                data[key] = value;

            }
            // we have to convert data Object to string because json data box will give data in to string
        }
        data = JSON.stringify(data)
    }

    else {

        // this json box will give data in to string so we don't need to change it
        data = document.getElementById("requestJsonText").value


    }

    // now we take get request and get data 


    if (requestType == 'get') {
        fetch(url, { method: 'GET' })
            .then((response) => response.text())
            .then((userdata) => {
                responsetext.innerHTML = userdata;
                Prism.highlightAll();
            })
    }

    // now we take post request
    else {
        parameters = {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        fetch(url, parameters).then((response) => response.text())
            .then((userdata) => {
                responsetext.innerHTML = userdata;
// it is for highlight our json in responsebox
                Prism.highlightAll();
            })
    }
})



