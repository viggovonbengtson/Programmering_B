// ============================================
// STATE
// ============================================
var currentPage = '#room2'
var gameState = 0
var timerInterval = null
var seconds = 0

// ---- REFERENCER MELLEM HTML & JS
//room1
const køkkenBtn1 = document.querySelector("#køkkenBtn1")
//room2
const room2hint1 = document.querySelector("#room2-hint1")
const room2hint2 = document.querySelector("#room2-hint2")
const room2hint3 = document.querySelector("#room2-hint3")
//room3
const monster = document.querySelector("#monster")
const monsterSort = document.querySelector("#monster_drink_sort")
const monsterHvid = document.querySelector("#monster_drink_hvid")
//room4
const room4hint1 = document.querySelector("#room4-hint1")
const room4hint2 = document.querySelector("#room4-hint2")
const room4hint3 = document.querySelector("#room4-hint3")
const symbol1 = document.querySelector("#symbol1")
const symbol2 = document.querySelector("#symbol2")
const symbol3 = document.querySelector("#symbol3")
const slibKniv = document.querySelector("#slibKniv")
const slibestenGåde = document.querySelector("#slibestenGåde")



// inventory og items
var invCrowbar = document.getElementById("invCrowbar")
var invKnife = document.getElementById("invKnife")

//laver to "events". Hvis man får crowbar, bliver crowbar = true. Heraf kan der ske specifikke funktioner hvis crowbar = true
var crowbar = false
var kniv = false
var knivSlibet = false

// Rum 1: antal fundne symboler
var doorsFound = 0
var crowbarsFound = 0


// Rum 1.2: rigtig rækkefølge og tæller
//rækkdefølgen af låse in order
var låsAnswer = ['lås1', 'lås3', 'lås2']
var låsStep = 0

// Rum 2: Ovn
// det button som har imput felt hvor man finder kniv
const ovn = document.getElementById("ovn")

// Rum 4: skuret
var symbolsFound = 0

// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {

    noCanvas()
    shiftPage('#room4')
    loadHighScores()

    //vi skjuler crowbar og knife ikonerne
    invCrowbar.hidden = true
    invKnife.hidden = true



    // ============================================
    // BUTTONS — de forskellige knapper til shiftpage, gåder og andre funktioner
    // ============================================

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Kælder med boxes ----
    //3 låse på døren, tryk i rigtig rækkefølge
    select('#room1 #woodenBox').mousePressed(() => {
        findCrowbar('#room1 #woodenBox')
        crowbar = true
        invCrowbar.hidden = false
    })

    select('#room1 #symbolDoor').mousePressed(() => {
        if(crowbar == true){
            findDoor('#room1 #symbolDoor')
            setTimeout(() => {
                shiftPage("#room1Door")
            }, 500);
        }
    })

    // RUM 1 - kælderen
    //dørs låse
    select('#room1Door #lås1').mousePressed(() => clickLås('lås1'))
    select('#room1Door #lås2').mousePressed(() => clickLås('lås2'))
    select('#room1Door #lås3').mousePressed(() => clickLås('lås3'))
    //buttons - shiftpage
    select('#køkkenBtn1').mousePressed(() => {
        shiftPage("#room2")
    })


    // RUM 2 - køkkenet
    //Ovn gåde
    select('#room2 #ovnBtn').mousePressed(() => { //tryk på ovn
        select('#room2 #room2-code').addClass('show')
    })
    select('#room2 #room2-submit').mousePressed(() => { //ovn gåden, submit answer
        checkRoom2Answer()
    })
    //buttons - shiftpage
    select('#kælderBtn2').mousePressed(() => { //går fra køkken til stuen
        shiftPage("#room1")
        //når vi går fra køkken tilbage til kælder, vises et nyt button.
        //dette button kan gå fra kælder ti køkken, da døren teknsik sert er åben.
        køkkenBtn1.classList.remove("hidden")
        køkkenBtn1.classList.add("visible")
    })
    select('#stueBtn2').mousePressed(() => { //går fra køkken til stuen
        shiftPage("#room3")
        if (kniv == true) {//hvis kniv er fundet
            select('#room3-hint1').removeClass("visible")
            select('#room3-hint1').addClass("hidden")
            select('#room3-hint2').removeClass("hidden")
            select('#room3-hint2').addClass("visible")
        }
    })
    

    // RUM 3 - Stuen
    //buttons - shiftpage
    select('#køkkenBtn3').mousePressed(() => { //går fra stue til køkken.
        shiftPage("#room2")
        
        if (kniv == true) {// kniven er fundet — behold hint3.
            return 
            //denne funktion gør at resten af koden i "select('#...') ikke køres igennem"
            //altså forbliver hint3 uændret hvis vi skifter frem og tilbage igen.
        }
        room2hint1.classList.remove("visible")
        room2hint1.classList.add("hidden")
        room2hint2.classList.remove("hidden")
        room2hint2.classList.add("visible")
    })
    select('#skurBtn3').mousePressed(() => { //går fra stue til skur.
        shiftPage("#room4")
    })
    select('#stueBtn4').mousePressed(() => {
        shiftPage("#room3")
    })

    
    // RUM 4 - Skuret
    //buttons
    select('#stueBtn4').mousePressed(() => {
        shiftPage("#room3")
        if (knivSlibet == true) {
            // kniven er fundet — behold hint3.
            return
        }
    })
    select('#room4 #slibestenBtn').mousePressed(() => { //tryk på slibesten
        if(gameState < 4 && knivSlibet != true){
            //gør symbolerne + kniv synlige efter at have trykket på slibestenen.
            //Dette gøres ved at alle elementerne hører til unbder en div, og den dig har hidden/visible
            slibestenGåde.classList.remove("hidden")
            slibestenGåde.classList.add("visible")
        }
    })
    // ---- RUM 4: Slib Kniven ---- 
    //når man trykker på symbolerne bliver findSymbol funtkionen kaldt.
    select('#room4 #symbol1').mousePressed(() => findSymbol('#room4 #symbol1'))
    select('#room4 #symbol2').mousePressed(() => findSymbol('#room4 #symbol2'))
    select('#room4 #symbol3').mousePressed(() => findSymbol('#room4 #symbol3'))
    select('#room4 #symbol4').mousePressed(() => findSymbol('#room4 #symbol4'))
    



    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })
}

    console.log(crowbar)

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}


// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

// ============================================
// START SPIL
// ============================================
function startGame() {
    gameState = 0
    symbolsFound = 0
    låsStep = 0
    startTimer()
    shiftPage('#room1')
}

// ============================================
// RUM 1: FIND SYMBOLER I KÆLDEREN, FIND CROWBAR
// ============================================
function findDoor(id) {
    select(id).hide()
    doorsFound++
}

function findCrowbar(id){
    select(id).hide()
    crowbarsFound++
}


// ============================================
// RUM 1 DØR: KLIK LÅSE I RÆKKEFØLGE
// ============================================
function clickLås(id) {
    if (id === låsAnswer[låsStep]) {
        låsStep++
    } else {
        låsStep = 0
    }

    if (låsStep === låsAnswer.length) {
        select('#room1Door #kælderdør').mousePressed(() => {
            if (låsStep === låsAnswer.length){
                shiftPage('#room2')
            }else{
                return
            }
        })
    }
}

// ============================================
// RUM 2 OVN OG KNIV: FÅ ITEM VIA GÅDE
// ============================================
function checkRoom2Answer() {
    var answer = select('#room2 #room2-answer').value().toLowerCase()
    if (answer.includes('kniv')) {
        invKnife.hidden = false //kniv vises i inventory
        gameState = 2
        kniv = true

        //her skiftes hints fra hint2 til hint3
        room2hint2.classList.remove("visible")
        room2hint2.classList.add("hidden")
        room2hint3.classList.remove("hidden")
        room2hint3.classList.add("visible")

        select('#room2 #room2-code').removeClass('show')
        return
    } else {
        select('#room2 #room2-error').html('Ikke helt - prøv igen!')
    }
}

// ============================================
// RUM 4: FIND SYMBOLER I SKURET, SLIB KNIVEN
// ============================================

//gør så div'en med kniv og symboler i får class="hidden" efter symboler er fundet

function findSymbol(id) {
    select(id).hide()
    symbolsFound++

    if (symbolsFound === 4) {

        gameState = 4

        slibestenGåde.classList.remove("visible")
        slibestenGåde.classList.add("hidden")

        room4hint1.classList.remove("visible")
        room4hint1.classList.add("hidden")
        room4hint2.classList.remove("hidden")
        room4hint2.classList.add("visible")
    }
}


// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
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

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    // scoresRef.add({ name: name, seconds: seconds }).then(() => {
    //     select('#btn-save').attribute('disabled', true)
    //     select('#btn-save').html('Gemt!')
    // })
}

// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')

    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 3')
    select('#room1-hint').html('Find de 3 skjulte symboler i junglen...')
    select('#room1 #symbol1').show()
    select('#room1 #symbol2').show()
    select('#room1 #symbol3').show()

    // Nulstil rum 2
    select('#room2 #room2-code').removeClass('show')
    select('#room2 #room2-answer').value('')
    select('#room2 #room2-error').html('')

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')
}
