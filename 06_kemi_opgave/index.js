
var currentPage = "#page3"
var videoButton, theVideo
var videoPlaying = true


//P5 setup bliver kaldt EN gang før siden vises
function setup()
{
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)

    var tilbageButton1 = createButton("tilbage")
    select('#theButtonTilbage1').child(tilbageButton1)
    tilbageButton1.mousePressed( ()=>{
        shiftPage('#page1') })
    var tilbageButton2 = createButton("tilbage")
    select('#theButtonTilbage2').child(tilbageButton2)
    tilbageButton2.mousePressed( ()=>{
        shiftPage('#page1') })



    var alkoholButton = createButton('forklaring af acetone')
    select('#alkoholForklaring').child(alkoholButton)
    alkoholButton.mousePressed( ()=>{
        shiftPage('#page2') })

    var aldehydButton = createButton('forklaring af dagens forsøg')
    select('#aldehydForklaring').child(aldehydButton)
    aldehydButton.mousePressed( ()=>{
        shiftPage('#page3') })
        
}

function shiftPage(newPage)
{
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
