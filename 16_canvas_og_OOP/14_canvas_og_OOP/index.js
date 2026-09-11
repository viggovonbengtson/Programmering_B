var x = 20
var ballOneSpeed = 10
var r = 40

var hSpeed
var g
var position
var veloctiy
var radius = 20
var friction = 0.99



//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('#page1')

    position.x = windowWidth/2
}


//draw kører 60x i sekundet(hvis framerate er 60fps)
function draw() {
    //vi kan sltte draw frammerate her
    frameRate(60)

    background(220, 100, 50)

    g = createVector(0, 1)
    veloctiy = createVector(0, 0.9)
    hSpeed = createVector(0, 5)

    //håndtér kugle 1
    fill('lightblue')
    circle(x, 100, r)
    
    x = x + ballOneSpeed
    
    if(x > windowWidth - r/2 || x < 0 + r/2){
        ballOneSpeed = -ballOneSpeed
    }
    
    // håndtér kugle 2
    fill('lime')
    noStroke()
    //fald ned mod "jorden"
    veloctiy += g
    veloctiy *= friction
    position.y += veloctiy

    circle(position.x, position.y, radius)

    if(position.y >= windowHeight - radius/2){
        position.y = windowHeight-radius/2
        veloctiy = -veloctiy
    }

    select('#info').html(round(veloctiy, 2))
}

function keyPressed(){
    console.log(key)
    if(key == " "){
        veloctiy += -10
    }
}
