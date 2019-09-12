document.getElementById("btn-search").addEventListener("click", function () {

    // Take input(pokemon name/id)
    let input = document.getElementById("user-input").value;
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

            console.log("pokeImgSrc", data.sprites.front_default);
            console.log("pokeId", pokeId);
            console.log("pokeName", pokeName);
            console.log("pokeMoves", pokeMoves);

            document.getElementById("img-pokemon").src = pokeImgSrc;
            document.getElementById("id-nr").innerHTML = pokeId;
            document.getElementById("name").innerHTML = pokeName;
            document.getElementById("moves").innerHTML = pokeMoves;

        })
        .catch(function (error) { // for the invalid input (fail to fetch)
            alert(error);
        });
});
