var gravity
var friction
var moveFriction
var b
var f
var g
var h
var i
var j
var k
var points
var bSound
var jSound
var dead = false
var hasPlayed = false; //styrer at lyden kun spillet EN GANG
var scoresRef = db.collection('jumping_ball_data')

// 'radius'/'r' hedder nu 'b.diam'

async function setup() {

    loadHighScores()
    bSound = await loadSound("../api_lib/sfx/cat-choke.mp3")
    jSound = await loadSound('sfx/bass.mp3')
    var c = createCanvas(windowWidth, windowHeight)
    
    gravity = createVector(0, 1)
    friction = 0.97
    moveFriction = 0.9
    
    select("#page2").child(c)
    select("#startButton").mousePressed(()=>shiftPage("#page2"))
    select('#restartButton').mousePressed(() => {
        window.location.reload()
    })
    
    b = new Ball(windowWidth/2, 600, 10, "orange", 12, 10)
    f = new FloatingBall(100, 200, 25, "red", 0, 10)
    g = new FloatingBall(400, 200, 25, "red", 0, -10)
    h = new FloatingBall(500, 500, 25, "red", 0, 10)
    i = new FloatingBall(800, 500, 25, "red", 0, -10)
    j = new FloatingBall(500, 300, 40, "#e32e8f", 0, -5)
    k = new FloatingBall(200, 300, 40, "#e32e8f", 0, 5)
    
    function loadHighScores() {
    scoresRef.orderBy('score', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}
}

//callback fra listen som har returneret et array
function updateHighscore(highscores){
    console.log('Got result', scores)
}

function draw() {
    
    if(dead == false){
        background('#7dbeff')
    }else{
        background(125, 190, 255, 10);
    }
    points = b.diam

    b.update()
    b.constrain()
    b.show()
    if(b.position.y < -b.diam/2){
        noLoop()
        shiftPage('#page3')
        select('#gameOverText').html('You Win!!!')
    }
    
    
    if(b.hit(f) || b.hit(g) || b.hit(h) || b.hit(i) || b.hit(j) || b.hit(k)){
        if (!bSound.isPlaying() && !hasPlayed) {
            bSound.play()
            hasPlayed = true
            friction = 0.90
            dead = true
            frameRate(45)
        }
        setTimeout(()=>{
            noLoop()
            shiftPage('#page3')
        }, 2000)
    }
    
    select('#info').html(points)
    select('#stats').html('Dine points: ' + points)
    
    //EVIL BALLS grrrrr!!!
    f.update()
    f.constrain()
    f.show()
    g.update()
    g.constrain()
    g.show()
    h.update()
    h.constrain()
    h.show()
    i.update()
    i.constrain()
    i.show()
    j.update()
    j.constrain()
    j.show()
    k.update()
    k.constrain()
    k.show()


}

function keyPressed() {
    if((key == "w" || key == " ") && dead == false){
        b.jump()
        b.diam += 10
        jSound.play()
    }
    if((keyCode == UP_ARROW || key == "s") && b.diam >=21){
        b.diam -= 20
    }
    if(key == "r"){
        b.diam = 10
    }
    if((keyCode == LEFT_ARROW || key == "a") && dead == false){
        b.left()
    }
    if((keyCode == RIGHT_ARROW || key == "d") && dead == false){
        b.right()
    }
}



function saveHighScore() {
    var name = select('#name').value().trim()
    if (name === '') {
        select('#name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    scoresRef.add({ name: name, score: score }).then(() => {
        select('#btn-save').attribute('disabled', true)
        select('#btn-save').html('Gemt!')
    })
}