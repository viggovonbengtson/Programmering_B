//array med alle Rick and Morty karakterene
var chars = []

function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
    
    getJSON()
}


async function getJSON( endpoint){
    //vi starter med at hente karakterene i Rick and Morty API
    var characters = await getJSON('https://rickandmortyapi.com/api/character?page=1')
    showCharacters(characters.results)


}

function showCharacters(characters){
    characters.map( c => {
        var card = createCard(c.name, c.species, c.image)
        select('#characters').elt.html += card
    })
}

