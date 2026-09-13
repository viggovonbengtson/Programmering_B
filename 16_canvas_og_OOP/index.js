var gravity
var friction
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
var hasPlayed = false; //styrer at lyden kun spillet EN GANG


async function setup() {

    bSound = await loadSound("/api_lib/sfx/cat-choke.mp3")
    jSound = await loadSound('/16_canvas_og_OOP/sfx/bass.mp3')
    var c = createCanvas(windowWidth, windowHeight)
    gravity = createVector(0, 1)
    friction = 0.97
    
    select("#page2").child(c)
    select("#startButton").mousePressed(()=>shiftPage("#page2"))
    select('#restartButton').mousePressed(() => {
        window.location.reload()
    })
    
    b = new Ball(windowWidth/2, 600, 10, "orange", 12)
    f = new FloatingBall(100, 200, 25, "red", 0, 10)
    g = new FloatingBall(400, 200, 25, "red", 0, -10)
    h = new FloatingBall(500, 500, 25, "red", 0, 10)
    i = new FloatingBall(800, 500, 25, "red", 0, -10)
    j = new FloatingBall(500, 300, 40, "#e32e8f", 0, -5)
    k = new FloatingBall(200, 300, 40, "#e32e8f", 0, 5)
    
}

function draw() {
    background('#7dbeff');
    b.update()
    b.constrain()
    b.show()
    if(b.position.y < -b.diam/2){
        noLoop()
        shiftPage('#page3')
        select('#gameOverText').html('You Win!!!')
    }
    
    points = b.diam
    
    if(b.hit(f) || b.hit(g) || b.hit(h) || b.hit(i) || b.hit(j) || b.hit(k)){
        if (!bSound.isPlaying() && !hasPlayed) {
            bSound.play()
            hasPlayed = true;
            gravity = createVector(0, 0.5)
            b.jumpForce = 5
            friction = 0.90
        }
        setTimeout(()=>{
            noLoop()
            shiftPage('#page3')
        }, 500)
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
    if(key == "w"){
        b.jump()
        b.diam += 10
        jSound.play()
    }
    if(key == " " && b.diam >=21){
        b.diam -= 20
    }
    if(key == "r"){
        b.diam = 10
    }
}
