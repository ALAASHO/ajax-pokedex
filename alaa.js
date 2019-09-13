document.getElementById("btn-search").addEventListener("click", function () {

    // Take input(pokemon name/id)
    let input = document.getElementById("btn-search").value;


    fetch("https://pokeapi.co/api/v2/pokemon/" + input)

        .then(function (response) {
            if (response.ok === false) {     // fail to fetch => error. go to .catch part
                throw('fetch error');
            }
            return response.json();
        })

        .then(data => {
            console.log(data);

            let pokeImgSrc = data.sprites.front_default;
            let pokeId = data.id;



        });
});
