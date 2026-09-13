var gravity
var friction
var b
var f
var points = 1000
var bSound


async function setup() {

    bSound = await loadSound("/api_lib/sfx/cat-choke.mp3")
    var c = createCanvas(windowWidth, windowHeight)
    select("#page2").child(c)
    select("#startButton").mousePressed(()=>shiftPage("#page2"))
    gravity = createVector(0, 1)
    friction = 0.97
    
    
    b = new Ball(windowWidth/2, 0, 10, "orange", 12)
    f = new FloatingBall(100, 100, 50, "red", 0, 20)
    
}

function draw() {
    background(100);
    b.update()
    b.constrain()
    b.show()
    
    
    if(b.hit(f)){
        points--
        bSound.play()
    }
    
    
    select('#info').html(points)
    
    
    f.update()
    f.constrain()
    f.show()
}

function keyPressed() {
    if(key == "w"){
        b.jump()
        f.jump()
        b.diam += 10
    }
    if(key == "s" && b.diam >=21){
        b.diam -= 20
    }
    if(key == "r"){
        b.diam = 10
    }
}
