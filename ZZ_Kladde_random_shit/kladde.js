//we select the id='game-container' from html - and save it in a var called game_container
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var time_display = document.querySelector('#time-display')
var timeout = 2000
var points = 0
var time_left = 10

function KillBeer(beer) {
    game_container.removeChild(beer)
    points += 5
    points_display.textContent = points
    spawnBeer()
}
function TimeoutBeer(beer) {
    if (game_container.contains(beer)){
        game_container.removeChild(beer)
        points -= 2
        points_display.textContent = points
        spawnBeer()
    }
}
//setinterval runs a function every x interval
//ÆNDR LILLE s TIL sTORT
function spawnBeer() {
    var new_beer = document.createElement('img')
    var top = Math.random() * 91
    var left = Math.random() * 91
    new_beer.style = `left: ${left}%; top: ${top}%;`
    new_beer.src = 'assets/mads.gif'
    //we add a classname to it so we can style it in css
    new_beer.className = 'øl'
    //we put a new img element insside the game container
    game_container.appendChild(new_beer)
    //when we click the new img element, we call the KillAsta function which removess it
    new_beer.addEventListener('click', () => {KillBeer(new_beer) })
    setTimeout(() => {
        TimeoutBeer(new_beer)
    }, timeout)
}

setInterval(() => {
    time_left -= 0.1
    time_display.textContent = Math.round(time_left * 10) / 10
    if (time_left <= 0){
        confirm(`You got ${points} points!`)
        location.reload()
    }
}, 100)

time_display.textContent = time_left

spawnBeer()


