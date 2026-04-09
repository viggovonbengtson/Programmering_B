//lav en ref til din collection
var quotesRef = db.collection("test")
console.log("oprettet reference til test")

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE!!!! .onSnapshot
    quotesRef.onSnapshot( snap => {
        console.log("modtog snap fra søren svane 🦶", snap.size)
        //ryd quotes div og sæt nye quotes ind
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        })
    })
}

//key pressed er en indbygget function i p5.js
function keyPressed(){
    //console.log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select("#newQuote").value()
        if(q == ""){
            confirm("så skriv dog noget før du trykker enter bitchass niiggaaa")
            return
        }
        //nu skal vi gemme det nye quote i firestore
        //funktionen add() på en collectionref
        //OPRETTER en ny collection hvis den IKKE findes
        quotesRef.add({
            text: q,
            timestamp: firebaseConfig.firestore.FieldValue.serverTimestamp()
            //.then kalde aynkront NÅR add er færdig
        }).then(
            console.log("Quote gemt i databasen", q)

        )
        
    }
    select("newQuote").html("")
}

