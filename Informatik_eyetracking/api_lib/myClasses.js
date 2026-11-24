class Ball {
  constructor(x, y, r, img, col, xSpeed, ySpeed, bounds){ 
    this.diam = r
    this.velocity = createVector(xSpeed || 0, ySpeed || 0) // hvis der ikke er angivet en værdi for xSpeed & ySpeed, vil dens hastighed bare være 0 som default
    this.position = createVector(x, y)
    this.img = null
    this.col = null
    if(typeof img === 'string'){
      this.col = img
    } else if(img){
      this.img = img
    }
    if(col) this.col = col
    this.bounds = bounds || [false, false, false, false]
    this.mass = this.diam
    this.fixed = false
  }
  update(){
    this.position.add(this.velocity)
  }
  show(){
    if(this.img){
      imageMode(CENTER)
      image(this.img, this.position.x, this.position.y, this.diam, this.diam)
    }else if(this.col){
      noStroke()
      fill(this.col)
      circle(this.position.x, this.position.y, this.diam)
    }
  }
  constrain(){
    var r = this.diam / 2
    var b = this.bounds
    if(b[0] && this.position.x < r){
      this.position.x = r
      this.velocity.x *= -1
    }
    if(b[1] && this.position.x > width - r){
      this.position.x = width - r
      this.velocity.x *= -1
    }
    if(b[2] && this.position.y < r){
      this.position.y = r
      this.velocity.y *= -1
    }
    if(b[3] && this.position.y > height - r){
      this.position.y = height - r
      this.velocity.y *= -1
    }
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam) / 2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
    return d <= totalR
  }

  bounce(other){
    // --- FASE 1: Rører de hinanden? ---
    var normal = p5.Vector.sub(this.position, other.position)
    var afstand = normal.mag()
    if(afstand === 0) normal.set(1, 0) // Undgå at dele med 0, hvis de ligger præcis oven i hinanden
    else normal.normalize()

    var overlap = (this.diam + other.diam) / 2 - afstand
    if(overlap <= 0) return // De rører ikke hinanden, afbryd.

    // --- FASE 2: Skub dem fra hinanden (så de ikke sidder fast) ---
    // Vi bruger invers masse. Fixed bolde har værdien 0 og lader sig ikke rykke.
    var invM1 = this.fixed ? 0 : 1 / this.mass
    var invM2 = other.fixed ? 0 : 1 / other.mass
    var sumInvM = invM1 + invM2
    if(sumInvM === 0) return // Begge bolde er fixed, vi stopper her.

    // Skub boldene væk fra hinanden, proportionelt med hvor "lette" de er.
    this.position.add(p5.Vector.mult(normal, overlap * (invM1 / sumInvM)))
    other.position.sub(p5.Vector.mult(normal, overlap * (invM2 / sumInvM)))

    // --- FASE 3: Selve bouncet (ændring af hastighed) ---
    // Hvor hurtigt bevæger de sig direkte imod hinanden?
    var relativHastighed = p5.Vector.sub(this.velocity, other.velocity)
    var fartModHinanden = relativHastighed.dot(normal)

    // Hvis de allerede bevæger sig væk fra hinanden, skal vi ikke gøre mere.
    if(fartModHinanden >= 0) return

    // Udregn stød-kraften (impuls). Tallet 2 betyder 100% elastisk stød (ingen energi går tabt).
    var stødKraft = -(2 * fartModHinanden) / sumInvM
    var stødVektor = p5.Vector.mult(normal, stødKraft)

    // Påfør stød-kraften på boldenes hastighed, igen baseret på hvor lette de er.
    this.velocity.add(p5.Vector.mult(stødVektor, invM1))
    other.velocity.sub(p5.Vector.mult(stødVektor, invM2))
    this.didBounce = true
    other.didBounce = true
  }
}


class MovingBall extends Ball{
  constructor(x, y, r, img, speed, col, bounds){
    super(x, y, r, img, col, 0, 0, bounds)
    this.speed = speed
    this.heading = createVector(1, 0)
  }

  left(){
    this.heading.x -= 0.1
  }
  right(){
    this.heading.x += 0.1
  }
  up(){
    this.heading.y -= 0.1
  }
  down(){
    this.heading.y += 0.1
  }
  forward(){
    this.velocity.set(this.heading.x * this.speed, this.heading.y * this.speed)
  }
  back(){
    this.velocity.set(this.heading.x * -this.speed, this.heading.y * -this.speed)
  }

  update(){
    this.heading.normalize()
    super.update()
  }

  show(){
    super.show()
    var tip = this.heading.copy().setMag(this.diam)
    stroke(0)
    strokeWeight(3)
    line(this.position.x, this.position.y, this.position.x + tip.x, this.position.y + tip.y)
  }
}

class ShootingBall extends MovingBall{
  constructor(x, y, r, img, speed, bulletSpeed, col, bounds){
    super(x, y, r, img, speed, col, bounds)
    this.bulletSpeed = bulletSpeed
    this.bullets = []
  }

  shoot(){
    this.bullets.push(new Bullet(
      this.position.x + this.heading.x * this.diam,
      this.position.y + this.heading.y * this.diam,
      this.heading,
      this.bulletSpeed,
      this.col
    ))
  }

  update(){
    super.update()
    this.bullets.map(b => b.update())
    this.bullets = this.bullets.filter(b => !b.isGone())
  }

  show(){
    super.show()
    this.bullets.map(b => b.show())
  }
}

class Bullet extends Ball{
  constructor(x, y, heading, speed, col){
    super(x, y, 16, null, col || '#111', heading.x * speed, heading.y * speed)
  }

  isGone(){
    return this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height
  }
}
