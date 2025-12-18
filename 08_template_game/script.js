
//we select the id='game-container' from html - and save it in a var called game_container
var game_container = document.querySelector('#game-container')

function brutalManslaughterOfAsta (asta) {
    game_container.removeChild(asta)
}
//setinterval runs a function every x interval
setInterval(() => {
    var new_asta = document.createElement('img')
    new_asta.src = 'assets/asta.png'
    //we add a classname to it so we can style it in css
    new_asta.className = 'asta'
    //we put a new img element insside the game container
    game_container.appendChild(new_asta)
    //when we click the new img element, we call the BrutalManslaughterOfAsta, (aka. KillAsta) function which removess it
    new_asta.addEventListener('click', () => {brutalManslaughterOfAsta(new_asta) })
}, 1250)


