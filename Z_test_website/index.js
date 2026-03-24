

var currentPage = "#page1"
var videoButton, theVideo
var videoPlaying = true


//P5 setup bliver kaldt EN gang før siden vises
function setup()
{
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)
    
    select('#nextPageButton1').mousePressed(() => {
        shiftPage("#page2")
    })
    select('#backPageButton2').mousePressed(() => {
        shiftPage("#page1")
    })
    select('#nextPageButton2').mousePressed(() => {
        shiftPage("#page3")
    })
    select('#backPageButton3').mousePressed(() => {
        shiftPage("#page2")
    })
    
    if(currentPage = "#page1"){
    }
    
    //sæt menu op
    //hent alle sider som et array
    var allPages = selectAll('.page')
    //løb listen igennem en for en
    allPages.map(
        (page) => {
            //lav et nyt <a> element
            var menuItem = createElement('a')
            //sæt 'a' tagget's html til sidens titel
            menuItem.html(page.attribute('title'))
            //sæt eventlister på 'a' tagget
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
            )
            //sæt tagget ind i sidebar
            select('.sidebar').child(menuItem)
        }
    )
}



function shiftPage(newPage)
{
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
