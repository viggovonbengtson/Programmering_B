

var currentPage = "#page1"


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
    klassen2T.map((hans)=>{
        console.log("denne person i klassen hedder " + hans)
        if(confirm("Hedder du ")){
            
        }
    })

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
