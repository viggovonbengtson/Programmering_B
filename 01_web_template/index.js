

var currentPage = "#page6"

//P5 setup bliver kaldt EN gang før siden vises
function setup()
{
    console.log('P5 setup kaldt')
    //Sæt event listeners op på menu
    select('#menu-side2').mousePressed(
        function()
        {
            shiftPage('#page3')
        }
    )
}

function shiftPage(newPage)
{
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
