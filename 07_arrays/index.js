

var currentPage = "#page3"
var listeInput, listeHeader, listeButton, listeContainer
var removeListe

function preload(){

}

//P5 setup bliver kaldt EN gang før siden vises
function setup()
{
    console.log('P5 setup kaldt')

    //skift til current page
    shiftPage(currentPage)
    
    //vi opretter et array med firkantede paranteser/brackets
    var klassen2T = ["balder", "Asta", "Viggo", "Bertram", "Tobias", "Selma", "victor"]

    //hvor mange elementer?
    console.log(klassen2T.length, "elementer i listen")
    //sådan bruger vi et element:
    console.log(klassen2T[0], "er den første i listen")
    //sådan lægger vi nye elementer til
    klassen2T.push("Mollie")
    klassen2T.push("Selma")
    klassen2T.push("Madsemus min fnuggi")
    klassen2T.push("Gilbert")
    klassen2T.push("Ludvig")
    klassen2T.push("John")
    klassen2T.push("Asbjørn")
    klassen2T.push("Milas")
    klassen2T.push("Silas")
    klassen2T.push("Lisbet")

    console.log(klassen2T, klassen2T.length)

    //sådan looper vi igennem et array:
    klassen2T.map((e)=>{ //'e' står for 'element'
        console.log("denne person i klassen hedder " + e)
    })

    
    //page 2
    //DOM BINDING
    listeButton = select("#listeButton")
    listeHeader = select("#listeHeader")
    listeInput = select("#listeInput")
    listeContainer = select("#listeContainer")

    //der er inputfelt i input felt til at tilføje nye elementer
    createList(klassen2T, listeContainer, 'elev')

    //Page 3
    //DOM binding
    removeListe = select('#removeListe')
    //make a list
    var elements = ["horse", "hamster", "subway sandwich", "bird", "php", "kangaroo", "Mads"]
    //call the generic function that makes new html elements
    createList(elements, removeListe, 'raidVictim')


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

//tager to argumenter - hvilken liste den skal gøre noget med og hvor den skal gøre af resultatet
function createList(list, dest, className){
    //først søger vi for at der er tomt i containeren
    dest.html('')
    list.map( e => {
        var div = createDiv(e)
        div.addClass(className)
        //hvis der er en action i argumenterne - så gør noget
        if(action){
            div.mousePressed(()=>{
                action(div)
            })
        }
        dest.child(div)
    })
}


function raid(){
    console.log("village was raided, what village")
    who.style('background-image', `url("./assets/crossbow.png")`)
}

