let container = document.querySelector(".container");
let url = "https://changeable-spice-plough.glitch.me/products" ;
let dropdown = document.querySelector(".drop")

async function getData(){
    try {
        let res = await fetch(url)
        if( !res.ok){
            throw new Error ("HTTP Error : ",res.statusText)
        }
        let product = await res.json()
        localStorage.setItem("products", JSON.stringify(product));
        let products = JSON.parse(localStorage.getItem('products'))
        displayData(products)
        displaydropdown(products)
    } catch (err) {
        console.error(err)     
    }
}

function displayData(products){
    container.innerHTML = '';
    if(products.length == 0){
        container.innerHTML = `
        <h1> No Data available </h1>
        `
    }
    else{
        products.forEach(obj => {
            let item = document.createElement('div');
            item.className = 'item'
            item.innerHTML = `
            <img src = '${obj.image}'>
            <p> <b>Title : </b>${obj.title} </p>
            <p><b> Price :</b> ${obj.price}</p>
            <p><i><b> Category : ${obj.category} </b></i><br>
            <button onclick = deleteData('${obj.id}')>Delete</button> 
            `;
            container.appendChild(item);
        });
    }
}

async function deleteData(id){
    try {
        let res = await fetch(`${url}/${id}`, {
            "method" : "DELETE"
        })
        if (!res.ok){
            throw new Error ("HTTP Error :", res.status)
        }
        if(res.ok){
            getData();
            alert("Data deleted succesfully");
        } 
    } catch (err) {
        console.error(err)
    }
}

function displaydropdown(products){
    dropdown.innerHTML = '';
    if(products.length != 0){
        let categoryArr = products.map(obj => obj.category)
        let defaultOpt = document.createElement("option")
        defaultOpt.textContent = "Select Category"
        defaultOpt.disabled = true
        defaultOpt.selected = true
        dropdown.appendChild(defaultOpt)

        Array.from(new Set(categoryArr)).forEach( category => {
            let option = document.createElement("option")
            option.innerHTML = category
            option.value = category
            dropdown.appendChild(option)
        })
    }    
}

dropdown.addEventListener("change", (cate) => filterData(cate.target.value));
function filterData(category){
    let products = JSON.parse(localStorage.getItem("products"));
    let result = products.filter(obj => obj.category == category)
    displayData(result)
}

getData()
