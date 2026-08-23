// Dine genbrugelige API-funktioner kommer her.



// ============================================
// TOAST — show toast message
// ============================================
//Demands an HTML element with id="toast"
function showToast(text, timeout=2000, type="notify"){
    var toast = select('#toast')
    toast.html(text)
    toast.addClass('toastShow')
    toast.addClass(type)
    setTimeout(()=>{
        toast.removeClass('toastShow')
    }, timeout)
}


// ============================================
// shiftPage — skift side
// ============================================
/*
function setup(){
    shiftPage('currentPage')
}
*/
var currentPage = "#page1"
var readyToShift = true
function shiftPage(newPage){
    if(readyToShift){
        if(!select(newPage)) return
        select(currentPage).removeClass('show')
        currentPage = newPage
        select(currentPage).addClass('show')
        readyToShift = false
        setTimeout(() => readyToShift = true, 50);
    }
}


// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
// indsæt <div id="timer">0 sek</div> i html
function startTimer(seconds=0, interval=1000) {
    seconds = 0
    timerinterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek') //gør så timer-elementet tæller sekunder op, ved at indsætte et variabel som hele tiden skifter værdier, ind i tekstindholdet
    }, interval)
}
function stopTimer() {
    clearInterval(timerInterval)//stop timeren
}

// ============================================
// visible/hidden klasser — disable ALL functions, in an INSTANT
// ============================================
//select('#').addClass("visible")
//select('#').removeClass("hidden")


// ============================================
// createCard — opretter cards
// ============================================
function createCard(text, img, destId){
    console.log(img)
    var containerDiv = createDiv().addClass('cardContainer')
    var topDiv = createDiv().addClass('top')
    var img = createImg(img)
    topDiv.child(img)
    var bottomDiv = createDiv(text).addClass('bottom')
    containerDiv.child(topDiv)
    containerDiv.child(bottomDiv)
    select(destId).child(containerDiv)
}
// createCard('besked', 'billede-url', '#card-id')
// Eksempel: createCard('Her er billedet', 'https://media.tenor.com/5x7yNPBj5HcAAAAm/happy.webp', '#cards')