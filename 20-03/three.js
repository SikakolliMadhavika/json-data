let container = document.getElementsByClassName("container")[0];
async function getJobData() {
    const url = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=10&offset=0&title_filter=%22Data%20Engineer%22&location_filter=%22United%20States%22%20OR%20%22United%20Kingdom%22';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '73c678e496msha87896d5c02bd7cp1aa4d7jsncab1b3113348',
            'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error ("HTTP Error", response.status);
        }
        const res = await response.json();
        displayData(res);
        // console.log(res);
    } catch (err) {
        console.error(err);
    }
}

function displayData(arr){
    for(let obj of arr){
        let item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
        <p><b>Job Title :</b><i>${obj.title}</i></p>
        <p><b>Organization :</b><i>${obj.organization}</i></p>
        <p><b>Apply before :</b><i>${obj.date_validthrough}</i></p>
        <p><b>Source :</b><i>${obj.source}</i></p>
        `;
        container.appendChild(item);
    }   
}
getJobData();