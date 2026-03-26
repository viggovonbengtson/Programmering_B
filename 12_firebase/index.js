
//lav en ref til din collection
var testRef = db.collection("test")
console.log("oprettet reference til test")

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE!!!
    testRef.onSnapshot( snap => {
        console.log("modtog snap fra søren svane 🦶", snap.size)
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        })
    })
}

