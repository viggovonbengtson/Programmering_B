// Instanser: constructor, update, show, hit

var gravity
var friction
var canvas
var ball
var jump
var spring
var move
var shoot
var other
var hits = 0

function setup(){
    gravity = createVector(0, 0.5)
    friction = 0.99
    canvas = createCanvas(canvasWidth(), windowHeight)

    ball = new Ball(120, 280, 80, null, '#ff6347', 4, 0)
    jump = new JumpingBall(400, 80, 80, null, 14, '#ffd700')
    spring = new SpringBall(400, 420, 80, null, 120, '#87ceeb')
    move = new MovingBall(160, 320, 80, null, 6, '#3cb371', [true, true, true, true])
    shoot = new ShootingBall(160, 320, 80, null, 6, 12, '#c0392b', [true, true, true, true])
    other = new Ball(width * 0.55, height * 0.45, 80, null, '#222')
    other.fixed = true
    other.bounds = [true, true, true, true]

    startDemo()
}

function draw(){
    // Ball
    if(currentPage == '#page1'){
        background('lightblue')
        ball.update()
        ball.constrain()
        countHit(ball, other)
        ball.bounce(other)
        ball.show()
        showOther()
    }

    // JumpingBall
    if(currentPage == '#page2'){
        background('lightpink')
        jump.update()
        jump.constrain()
        countHit(jump, other)
        jump.bounce(other)
        jump.show()
        showOther()
    }

    // SpringBall
    if(currentPage == '#page3'){
        background('lightseagreen')
        if(mouseIsPressed && (spring.isDragging || dist(mouseX, mouseY, spring.position.x, spring.position.y) < spring.diam / 2)){
            spring.drag()
        }
        spring.update()
        spring.constrain()
        countHit(spring, other)
        spring.bounce(other)
        spring.show()
        showOther()
        if(spring.isFlying && (spring.position.x < 0 || spring.position.x > width || spring.position.y > height)){
            spring.reset()
        }
    }

    // MovingBall
    if(currentPage == '#page4'){
        background('palegreen')
        clearDrive(move)
        steer(move)
        move.update()
        move.constrain()
        countHit(move, other)
        move.bounce(other)
        move.show()
        showOther()
    }

    // ShootingBall
    if(currentPage == '#page5'){
        background('peachpuff')
        clearDrive(shoot)
        steer(shoot)
        shoot.update()
        shoot.constrain()
        countHit(shoot, other)
        shoot.bounce(other)
        shoot.bullets.map(b => {
            countHit(b, other)
            b.bounce(other)
        })
        shoot.show()
        showOther()
    }
}

function clearDrive(b){
    if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)){
        b.didBounce = false
        return
    }
    if(b.didBounce) return
    b.velocity.set(0, 0)
}

function steer(b){
    if(keyIsDown(65)) b.left()
    if(keyIsDown(68)) b.right()
    if(keyIsDown(87)) b.up()
    if(keyIsDown(83)) b.down()
    if(keyIsDown(UP_ARROW)) b.forward()
    if(keyIsDown(DOWN_ARROW)) b.back()
}

function countHit(a, b){
    var h = a.hit(b)
    if(h && !a.wasHit){
        hits++
        select('#g-points').html(hits)
    }
    a.wasHit = h
}

function mouseReleased(){
    if(currentPage == '#page3' && spring.isDragging) spring.launch()
}

function keyPressed(){
    if(currentPage == '#page2' && key == ' ') jump.jump()
    if(currentPage == '#page5' && key == ' ') shoot.shoot()
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) return false
}
