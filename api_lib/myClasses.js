

class Ball{
  constructor(x, y, r, col, jump, move){
    this.diam = r
    this.col = col
    this.velocity = createVector(0,0)
    this.position = createVector(x,y)
    this.jumpForce = jump
    this.moveForce = move
  }
  update(){
    this.velocity.add(gravity)
    this.velocity.y *= friction
    this.velocity.x *= moveFriction
    this.position.add(this.velocity)
  }
  constrain(){
    if(this.position.y > height - this.diam/2){
      this.position.y = height - this.diam/2
      this.velocity.y *= -1
    }
  }
  jump(){
    this.velocity.y -= this.jumpForce
  }
  left(){
    this.velocity.x -= this.moveForce
  }
  right(){
    this.velocity.x += this.moveForce
  }
  
  show(){
    fill(this.col)
    circle(this.position.x, this.position.y, this.diam)
  }
  hit(secondBall){
    var b = secondBall
    var totalR = (this.diam + b.diam) /2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
    if(d <= totalR){
        console.log('Balls Hit')
        return true
    }else{
        return false
    }
  }
}

class FloatingBall extends Ball{
    constructor(x, y, r, col, jump, speed){
        // super betyder at vi overtager disse argumenter fra "super" klassen (ball)
        super(x, y, r, col, jump)
        //vi overskriver velocity  vektoren med en lokal der flytter sig på x-aksen
        this.velocity = createVector(speed, 0)
    }
    update(){
        this.position.add(this.velocity)
    }

    constrain(){
        // sørg for at FloatingBall bouncer på siderne
        this.position.x = constrain(this.position.x, this.diam/2, windowWidth - this.diam/2)
        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.x *= -1
        }
    }
}