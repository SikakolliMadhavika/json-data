let container = document.getElementsByClassName("container")[0];
async function imdbdata() {
    const url = 'https://imdb-top-1000-movies-series.p.rapidapi.com/byrating';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '73c678e496msha87896d5c02bd7cp1aa4d7jsncab1b3113348',
            'x-rapidapi-host': 'imdb-top-1000-movies-series.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            above: '8.1',
            under: '8.2'
        })
    };
    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error("HTTP Error", response.status);
        }
        const res = await response.json();
        displayData(res.result);
    } catch (err) {
        console.error(err);
    } 
}

function displayData(arr){
    for(let obj of arr){
        let item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
        <p><i>Title :</i><b> ${obj.Series_Title}</b></p>
        <p><i>Rank : </i><b>${obj.rank}</b> </p>
        <p><i>Released Year :</i><b> ${obj.Released_Year}</b></p>
        `;
        container.appendChild(item);
    }
}



imdbdata()