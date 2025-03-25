let container = document.querySelector(".container");
let loader = document.querySelector(".loader")

async function getData(){
    try {
        let response = await fetch ("https://dummyjson.com/recipes")
        if(!response.ok){
            throw new Error("HTTP Error :", response.status);
        }
        let result = await response.json()
        localStorage.setItem("recipes" , JSON.stringify(result.recipes));
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        // console.log(recipes);
        displayData(recipes);

    } catch (err) {
        console.error(err)       
    }
}

function displayData(recipes){
    container.innerHTML="";
    recipes.forEach(dish => {
        let item = document.createElement("div");
        let {image,name,rating,cuisine,mealType, caloriesPerServing, difficulty,serving, id } = dish
        // console.log(name, rating, id, cuisine)
        item.innerHTML = `
        <img src = "${image}">
        <p><b> Title : </b><i>${name}</i> </p>
        <p><b> Cuisine : </b><i>${cuisine}</i> </p>
        <p><b>MealType : <b><i>${mealType[0]}</i></p>
        <p><b> Rating : </b><i>${rating}</i>⭐ </p>
        <p><b> Difficulty : </b><i>${difficulty}</i> </p>
        <p><b> Calories : </b> <i>${caloriesPerServing}cal</i></p>
        <button onclick = "moreData(${id})">More Info</button>
        `;
        container.appendChild(item);
        // console.log(dish)
    });
    loader.remove()
}

function moreData(id){
    window.location.href = `./more.html?id=${id}`;
}

getData();

