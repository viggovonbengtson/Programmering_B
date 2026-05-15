// ============================================
// STATE
// ============================================
var currentPage = '#room2'
var gameState = 0
var timerInterval = null
var seconds = 0

// inventory og items
var invCrowbar = document.getElementById("invCrowbar")
var invKnife = document.getElementById("invKnife")

//laver to "events". Hvis man får crowbar, bliver crowbar = true. Heraf kan der ske specifikke funktioner hvis crowbar = true
var crowbar = false
var kniv = false

// Rum 1: antal fundne symboler
var symbolsFound = 0

// Rum 1.2: rigtig rækkefølge og tæller
//rækkdefølgen af låse in order
var låsAnswer = ['lås1', 'lås3', 'lås2']
var låsStep = 0

// Rum 2: Ovn
// det button som har imput felt hvor man finder kniv
const ovn = document.getElementById("ovn")


// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {

    

    noCanvas()
    shiftPage('#room1')
    loadHighScores()
    
    //vi skjuler crowbar og knife ikonerne
    invCrowbar.hidden = true
    invKnife.hidden = true

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Kælder med boxes ----
    //3 låse på døren, tryk i rigtig rækkefølge
    select('#room1 #woodenBox').mousePressed(() => {
        findItem('#room1 #woodenBox')
        crowbar = true
        invCrowbar.hidden = false
    })

    select('#room1 #symbolDoor').mousePressed(() => {
        if(crowbar == true){
            findSymbol('#room1 #symbolDoor')
            setTimeout(() => {
                shiftPage("#room1Door")
            }, 500);
        }
    })

    // ---- RUM 1: Dørs låse ----
    select('#room1Door #lås1').mousePressed(() => clickLås('lås1'))
    select('#room1Door #lås2').mousePressed(() => clickLås('lås2'))
    select('#room1Door #lås3').mousePressed(() => clickLås('lås3'))
    
    // -------- BUTTONS --------

    // ---- RUM 2: Kælder ----
    select('#køkkenBtn1').mousePressed(() => {
        shiftPage("#room2")
    })
    // ---- RUM 2: Ovn ----
    select('#room2 #ovnBtn').mousePressed(() => {
        select('#room2 #room2-code').addClass('show')
    })
    select('#room2 #room2-submit').mousePressed(() => {
        checkRoom2Answer()
    })
    
    // til stuen
    select('#stueBtn2').mousePressed(() => {
        shiftPage("#room3")
    })
    
    // ---- RUM 3: Stuen ----
    select('#køkkenBtn3').mousePressed(() => {
        shiftPage("#room2")
    })
    select('#skurBtn3').mousePressed(() => {
        shiftPage("#room4")
    })
    
    // ---- RUM 4: Skuret ----
    select('#stueBtn4').mousePressed(() => {
        shiftPage("#room3")
    })
    


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
// RUM 1: FIND SYMBOLER I KÆLDEREN
// ============================================
function findSymbol(id) {
    select(id).hide()
    symbolsFound++
    
}

function findItem(id){
    select(id).hide()
    symbolsFound++
    
    //lav if-funktion hvis crowbar er fundet
    select('#crowbar-found').html('Fundet: ' + symbolsFound + ' / 1 🦯')
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
// RUM 1 OVN: FÅ ITEM VIA GÅDE
// ============================================
function checkRoom2Answer() {
    var answer = select('#room2 #room2-answer').value().toLowerCase()
    if (answer.includes('kniv')) {
        kniv = true
        invKnife.hidden = false
        gameState = 2

        select('#room2 #room2-code').removeClass('show')
        return
    } else {
        select('#room2 #room2-error').html('Ikke helt - prøv igen!')
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
