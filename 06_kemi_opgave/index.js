
var currentPage = "#page1"
var videoButton, theVideo
var videoPlaying = true


//P5 setup bliver kaldt EN gang før siden vises
function setup()
{
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    var tilbageButton = createButton("tilbage")
    select('#theButtonTilbage').child(tilbageButton)
    tilbageButton.mousePressed( ()=>{
        shiftPage('#page1') })

    var alkoholButton = createButton('forklaring alkohol')
    select('#alkoholForklaring').child(alkoholButton)
    alkoholButton.mousePressed( ()=>{
        shiftPage('#page2') })

    var aldehydButton = createButton('forklaring aldehyd')
    select('#aldehydForklaring').child(aldehydButton)
    aldehydButton.mousePressed( ()=>{
        shiftPage('#page3') })
        
    var carboxyButton = createButton('forklaring carboxy syre')
    select('#carboxysyreForklaring').child(carboxyButton)
    carboxyButton.mousePressed( ()=>{
        shiftPage('#page4') })
        
}

function shiftPage(newPage)
{
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
