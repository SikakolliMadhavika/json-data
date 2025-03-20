let container = document.getElementsByClassName("container")[0];
async function randomDog(){
    try{
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        if(!res.ok){
            throw new Error("HTTP error!", res.status);
        }
        let obj = await res.json()
        let { message} = obj;
        displayData(message)
    }
    catch(err){
        console.warn(err)
    }
}
function displayData(url, status){
    container.innerHTML = `
    <img src='${url}'>
    `;
}
randomDog();

