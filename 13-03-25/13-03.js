function addData(){

    var Name = document.getElementById("Name")
    var PhoneNo = document.getElementById("PhoneNo")
    var Address = document.getElementById("Address")
    var City = document.getElementById("City")
    var State = document.getElementById("State")
    postData(Name, PhoneNo, Address, City, State)
    
}



function postData(Name, PhoneNo, Address, City, State){
    if (Name.value == "" || PhoneNo.value == "" || Address.value == "" || City.value == "" || State.value == ""){
        alert("Add data in every feild")
    }
    else{
        fetch("https://marshy-juvenile-dinosaur.glitch.me/Students", {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body" : JSON.stringify({
                "Name" : Name.value,
                "PhoneNo" : PhoneNo.value,
                "Address" : Address.value,
                "City" : City.value,
                "State" : State.value
            })
        })
            .then(res => {
                if(res.ok){
                    alert("Data Added Successfully");
                    displayData()
                    Name.value = ""
                    PhoneNo.value = ""
                    Address.value = ""
                    City.value = ""
                    State.value = ""

                }
            })
            .catch(err =>{
                alert("Something went wrong")
                console.error(err)
            })
    }  
}



function displayData(){
    var container = document.getElementById("container");

    fetch("https://marshy-juvenile-dinosaur.glitch.me/Students")
        .then( res => res.json())
        .then(data =>{
            for ( var obj of data){

                var item = document.createElement("div");
                item.className = "container-fluid border border-warning my-2 p-2 rounded rounded-2";

                var namepara = document.createElement("p")
                var phonepara = document.createElement("p")
                var addresspara = document.createElement("p")
                var citypara = document.createElement("p")
                var statepara = document.createElement("p")

                var { Name, PhoneNo, Address, City, State} = obj;

                namepara.innerText = Name;
                phonepara.innerText = PhoneNo;
                addresspara.innerText = Address;
                citypara.innerText = City;
                statepara.innerText = State;

                item.appendChild(namepara)
                item.appendChild(phonepara)
                item.appendChild(addresspara)
                item.appendChild(citypara)
                item.appendChild(statepara)

                container.appendChild(item)

            }
        })
}
displayData();