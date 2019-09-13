document.getElementById("btn-search").addEventListener("click", function () {

    // Take input(pokemon name/id)
    let input = document.getElementById("user-input").value;
    input = input.toLowerCase();
    console.log("input");

    fetch("https://pokeapi.co/api/v2/pokemon/" + input)

        .then(function (response) {
            if (response.ok === false) {     // fail to fetch => error. go to .catch part
                throw('fetch error');
            }
            return response.json();
        })

        .then(data => {
            console.log("original data", data);

            let pokeImgSrc = data.sprites.front_default;
            let pokeId = data.id;
            let pokeName = data.name;
            let pokeMoves = [];
            for(let i=0; i<5; i++){
                pokeMoves.push(data.moves[i].move.name);
            }

            // console.log("pokeImgSrc", data.sprites.front_default);
            // console.log("pokeId", pokeId);
            // console.log("pokeName", pokeName);
            // console.log("pokeMoves", pokeMoves);

            document.getElementById("img-pokemon").src = pokeImgSrc;
            document.getElementById("id-nr").innerHTML = pokeId;
            document.getElementById("name").innerHTML = pokeName;
            document.getElementById("moves").innerHTML = pokeMoves;


            console.log("url for 2nd Fetch : ", data.species.url);

            return fetch(data.species.url)
        })

        // Second fetch - to get the prev evolution
        .then(function (response) {
            if (response.ok === false) {
                // throw('fetch error');
            }
            return response.json();
        })

        .then(data => {
            console.log("second fetch: ", data);

            let prev_evolution = data.evolves_from_species; // null if there is no prev

            // console.log("prev_evolution", prev_evolution);
            // if (prev_evoluation == undefined) {
            //     console.log("no previous evolution for this pokemon")
            // }

            console.log("previous evolution : ", prev_evolution);
            console.log("previous evolution name : ", prev_evolution.name);
            console.log("url for previous evolution : ", prev_evolution.url); // later use for link to previous evolution one

            let prev_url = prev_evolution.url.split('/');
            console.log("prev_url", prev_url);
            let prev_id = prev_url[prev_url.length-2];
            console.log("prev_id", prev_id);

            document.getElementById("prev-name").innerHTML = prev_evolution.name;


            console.log("url for 3rd Fetch : ", "https://pokeapi.co/api/v2/pokemon/"+prev_id);
            return fetch("https://pokeapi.co/api/v2/pokemon/"+prev_id)

        })

        // 3rd Fetch to get the image of prev evoluation
        .then(function (response) {
            if (response.ok === false) {
                // throw('fetch error');
            }
            return response.json();
        })

        .then(data => {
            console.log(data);

            let prevEvoImgSrc = data.sprites.front_default;
            console.log(prevEvoImgSrc);
            document.getElementById("prev-img").src = prevEvoImgSrc;

        })

        .catch(function (error) { // for the invalid input (fail to fetch)
            alert(error);
        });
});
