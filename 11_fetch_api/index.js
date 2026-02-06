var currentPage = '#page1'
var deck
var player = {
    cards:[],
    total:0
}

var dealer = {
    cards:[],
    total:0
}

var state = "begin"

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)



    getDeck()



    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

}

// async står for asynconous - vi ved ikke hvor længe et det tager at kære funktionen
async function getDeck() {
    try{
        //fetch kan hente data fra en server ude i "byen"
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        //response objektet kommer tilbage fra serveren - og HVIs response.ok er true,
        console.log("response objektet:", response)
        if(response.ok){
            const data = await response.json()
            console.log("data vi får tilbage:", data)
            deck = data
            drawCard()
        }
    } catch(error){

    }
}

async function drawCard(){
    if(state == "begin"){
        var cardOne = await getOneCard()
        player.cards.push(cardOne)
        var cardTwo = await getOneCard()
        player.cards.push(cardTwo)
        //dealerens FØRsTE kort skal være skjultd
        var dealerCardOne = await getOneCard()
        dealerCardOne.hidden = true
        dealer.cards.push(dealerCardOne)
        var dealerCardTwo = await getOneCard()
        dealer.cards.push(dealerCardTwo)
        showCards()
    }
    if(state == "dealer"){
        
    }
    if(state == "player"){
        
    }
}

function showCards(){
    console.log("showCards er klar med nyt kort", player.cards, dealer.cards)
    select("#player .cards").html("")
    player.cards.map( (c, i) => {
        var img = createImg(c.image)
        img.style("transform", `translate(${i*40}px, ${i*40}px)`)
        select("#player .cards").child(img)
    })
    select("#dealer .cards").html("")
    dealer.cards.map( (c, i) => {
        if(c.hidden){
            img = createImg("https://deckofcardsapi.com/static/img/back.png")
        } else{
            var img = createImg(c.image)
        }
        img.style('transform', `translate(${i*40}px, ${i*40}px)`)
        select("#dealer .cards").child(img)
    })
}

function returnCardValue(card){
    if(isNaN(card.value)){
        if(card.value=="ACE"){
            return 10
        } else{
            return card.value
        }
    }
}

async function getOneCard(){
    //hent et kort
    var card
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await response.json()
        console.log("drawCard", data)
        return data.cards[0]
    } catch(error){
        console.log("Error catched", error)
    }
}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

