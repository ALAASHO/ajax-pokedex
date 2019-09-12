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
            console.log(data)
        })
        .catch(function (error) { // for the invalid input (fail to fetch)
            alert(error);
        });
});
