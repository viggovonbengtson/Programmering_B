// Demo-interface: menu, parameterkasse, Firebase


var fb

function startDemo(){
    setGlobals()
    wireInputs(['#g-gravity', '#g-friction'], setGlobals)

    select('#page1').child(canvas)
    createMenu('.sidebar', setCanvasShiftPage)
    setCanvasShiftPage('#page1')

    selectAll('.params').map(box => {
        var name = box.attribute('data-name')
        if(!name) return
        selectAll('.param', box).map(el => {
            el.attribute('data-name', name)
            el.input(changeProperty)
        })
        selectAll('.file-param', box).map(el => {
            wireFile(el, img => setPath(instance(name), 'img', img))
        })
    })

    if(typeof db !== 'undefined'){
        fb = new Firebase('myClasses_Demo_Collection')
        fb.listen(showCards, false, 'points')
        select('#saveDemo').mousePressed(() => {
            var n = txt('#fb-name')
            if(n == '') return
            fb.save(n, num('#fb-points'))
        })
    }
}

function setCanvasShiftPage(id){
    shiftPage(id)
    hits = 0
    ;[ball, jump, spring, move, shoot, other].map(b => { if(b) b.wasHit = false })
    if(other){
        other.velocity.set(0, 0)
        other.position.set(width * 0.55, height * 0.45)
    }
    select('#g-points').html(0)
    if(id != '#page6'){
        select(id).child(canvas)
        select(id + ' .dock').child(select('#globals'))
    }
}

function setGlobals(){
    gravity = createVector(0, num('#g-gravity'))
    friction = num('#g-friction')
}

function instance(name){
    return { ball: ball, jump: jump, spring: spring, move: move, shoot: shoot, other: other }[name]
}

function setPath(obj, path, value){
    var keys = path.split('.')
    var last = keys.pop()
    for(var i = 0; i < keys.length; i++) obj = obj[keys[i]]
    obj[last] = value
}

function changeProperty(){
    var name = this.attribute('data-name')
    var key = this.attribute('data-key')
    var value = this.attribute('type') == 'checkbox' ? this.elt.checked : this.attribute('type') == 'number' ? Number(this.value()) : this.value()
    var b = instance(name)
    setPath(b, key, value)
    if(key == 'fixed' && value) b.velocity.set(0, 0)
    if(b.start && !b.isFlying && !b.isDragging) b.position.set(b.start.x, b.start.y)
}

function showOther(){
    if(!other.fixed){
        other.update()
        other.constrain()
    }
    other.show()
    noStroke()
    fill(0)
    textSize(18)
    textStyle(BOLD)
    var below = other.position.y + other.diam / 2 + 8
    if(below > height - 24){
        textAlign(CENTER, BOTTOM)
        text('Another Ball', other.position.x, other.position.y - other.diam / 2 - 6)
    }else{
        textAlign(CENTER, TOP)
        text('Another Ball', other.position.x, below)
    }
    textStyle(NORMAL)
}

function showCards(list){
    var grid = select('#fb-grid')
    grid.html('')
    list.map(p => {
        grid.child(createCard('demo_collection', p.name + ' · ' + p.points, () => fb.remove(p.id)))
    })
}
