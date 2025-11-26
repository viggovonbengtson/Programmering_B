
var currentPage = "#page2"
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
    myButton.mousePressed( ()=>{
        shiftPage('#page1') })

    var alkoholButton = createButton('forklaring alkohol')
    select('#alkoholbutton').child(alkoholButton)
    myButton.mousePressed( ()=>{
        shiftPage('#page2') })

    var myButton3 = createButton('forklaring aldehyd')
    select('#theButtonTilbage').child(myButton3)
    myButton.mousePressed( ()=>{
        shiftPage('#page3') })
        
    var myButton4 = createButton('forklaring carboxy syre')
    select('#theButtonTilbage').child(myButton4)
    myButton.mousePressed( ()=>{
        shiftPage('#page4') })

    var myButton = createButton("Få noget mere info!!!!!!!")
   //Læg en ind i side 5
   select("#theButton").child(myButton)
   //Lav en event listener
   myButton.mousePressed(()=>{
    shiftPage("#page2")
   })
}

function shiftPage(newPage)
{
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
