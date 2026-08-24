
//array med alle Rick and Morty karakterene
var chars = []

function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.
    getChars()
    
    
}

async function getChars(){
    //vi starter med at hente karakterene i Rick and Morty API
    var res
    try{
        var res = await fetch('https://rickandmortyapi.com/api/character?page=1')
    }catch(err){
        console.log(err)
    }
    //Hvis response er ok, henter vi json data
    var json = await res.json()
    chars = json.results
    console.log(chars)
}
