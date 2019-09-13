function getNextImage(sprites){
    let gallery = [];

    for (let key in sprites)
        if(sprites[key] !== null)
        gallery.push(sprites[key]);
    // console.log("gallery", gallery);

    let carousel = document.getElementById("img-pokemon");

    let srcIndex = gallery.indexOf(carousel.src);
    // console.log(srcIndex+ " " + typeof(srcIndex));

    if(srcIndex === gallery.length-1) { // If the cur src is the last one in the array
        srcIndex = 0;                   // set the index with 0 (to go to the first img°
    } else {                            // otherwise
        srcIndex ++
    }
    carousel.src = gallery[srcIndex];
}

document.getElementById("btn-search").addEventListener("click", function () {

    // Take input(pokemon name in lowercase /id)
    let input = document.getElementById("user-input").value;
    input = input.toLowerCase();

    // 1st fetch (always)
    fetch("https://pokeapi.co/api/v2/pokemon/" + input)

        .then(function (response) {
            if (response.ok === false) {     // fail to fetch(1st) => go to .catch part (at the end)
                throw('Please check correct pokemon name/id again!');
            }
            return response.json();
        })

        .then(data => {
            // console.log("original data", data);
            var arrayData = Array.from(data);

            let pokeImgSrc = data.sprites.front_default;
            const pokeMoves = [];
            const numMoves = 4;
            for(let i=0; i<numMoves; i++){
                pokeMoves.push(data.moves[i].move.name);
            }

            // console.log("pokeImgSrc", data.sprites.front_default);
            document.getElementById("img-pokemon").src = pokeImgSrc;
            document.getElementById("id-nr").innerHTML = data.id;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("type").innerHTML = data.types[0].type.name;
            document.getElementById("height").innerHTML = data.height +"0 cm";
            document.getElementById("weight").innerHTML = data.weight +" kg";
            document.querySelectorAll(".blueButton").forEach(function(item, i){
               item.innerHTML = pokeMoves[i];
            });

            document.getElementById("bigbluebutton").addEventListener("click", function () {
                getNextImage(data.sprites);
            });

            // console.log("url for 2nd Fetch : ", data.species.url);
            return fetch(data.species.url)
        })

        // Second fetch - to get species info / to check the prev evolution
        .then(function (response) {
            if (response.ok === false) {
                throw('2nd fetch error'); // but normally no error (cuz all pokemon have the species info)
            }
            return response.json();
        })

        .then(data => {
            // console.log("second fetch: ", data);

            // first check whether there is prev-evolution or not
            let prev_evolution = data.evolves_from_species;
            // console.log("prev_evolution", prev_evolution); // null if there is no prev

            // if it has no prev-evolution,
            if (prev_evolution === null) {
                document.getElementById("yellowBox1").innerHTML = "no previous evolution";
                document.getElementById("yellowBox2").innerHTML = "";

            } else {    // if it has prev-evolution
                // console.log("previous evolution name : ", prev_evolution.name);
                // console.log("url for previous evolution : ", prev_evolution.url); // later use for link to previous evolution one

                let prev_url = prev_evolution.url.split('/');
                // console.log("prev_url", prev_url);
                let prev_id = prev_url[prev_url.length-2];
                // console.log("prev_id", prev_id);

                // display the prev-evolution name
                document.getElementById("yellowBox1").innerHTML = prev_evolution.name;

                // Prepare 3rd fetch to find the image of prev-evolution
                return fetch("https://pokeapi.co/api/v2/pokemon/"+prev_id)

                // with 3rd Fetch(optional, only for the pokemon who has prev-evolution)
                    .then(function (response) {
                        if (response.ok === false) {
                            throw('3rd fetch error');
                        }
                        return response.json();
                    })

                    .then(data => {
                        // console.log(data);
                        let prevPokeImgSrc = data.sprites.front_default;
                        // console.log(prevPokeEvoImgSrc);
                        document.getElementById("prev-img").src = prevPokeImgSrc;
                    })
            }
        })

        .catch(function (error) { // for the invalid input (fail to first fetch)
            alert(error);
        });
});
