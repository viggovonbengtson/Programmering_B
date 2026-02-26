
    // -------------------------------------------------------------
    // TRIN 4: OPRET GRAFEN
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------

    const ctx = document.getElementById("chartCanvas");
    myChart = new Chart(ctx, {
        type: "scatter",
        data: {datasets:datasets},
        options: {
            scales: {
                x:{title:{display:true,text:colX}},
                y:{title:{display:true,text:colY}},
            }
        }
    });
    //start op GUI funktionalitet (knapper og sliders)
    setupControls()






// -------------------------------------------------------------
// TRIN 5: KNN ALGRORITMEN (Nearest Neighbour)
// (Dette sker når man trykker på knappen)
// -------------------------------------------------------------
    function classifyUnknown(){ //klassificer ukendt data
        // 1. aflæs input fra sliderne
        var inputX = Number(select("#input-x").value())
        var inputY = Number(select("#input-y").value())

        //2. opdater grafen med det nye punkt
        //Det sidste dataset er "Dit Gæt"
        // indæt punktet fra sliderne i grafen
        var guessDataset = myChart.data.datasets[myChart.data.datasets.length -1]
        guessDataset.data = [{x:inputX, y: inputY}]

        //3. beregn afstande fra input-punktet til ALLE punkter i data
        // løb data igennem - altså ALLE datapunkterne - og find hver og ens afstand til vores gæt
        //vi bruger map til at skabe en NY liste hvor hvert punkt har en .distance
        //parameteret "p" står for point
        data = data.map(p => {
            //pythagoras på 2D: dist(x1, y1, x1, y1)
            //dist ligger i p5.js og den laver pythagoras for os
            //inputX og inputY er det nye punkt, og p.x og p.y er de allerede punkter
            p.distance = dist(inputX, inputY, p.x, p.y)
            return p
        })

        //uni.log(data)

        //4. sorter data så de mindste afstande til  kommer først
        //den som vi returnerer først er den med korteste disance
        //sort (a,b) => tag hvert åunkt og sammenlign deres distance og sæt den mindste forrest
        data.sort((a, b) => a.distance - b.distance)

        //5. find de K nærmeste naboer
        //spørg [k] nærmeste  hvilken gruppe de hører til
        var k = Number(select("#k-slider").value())
        //hvis k=11(vi vælger tætteste 11 naboer), tager den alle punkterne fra 0 -> 11
        //neighbours er nu de første k elementer i data arrayet
        var neighbors = data.slice(0, k)

        //6. Tæl stemmer (voting)
        //de stemmer om resultatet of vinderen er fundet
        //votes er et tomt objekt
        var votes = {}
        neighbors.map(n => {
            //Hvis vi IKKE har set denne label før, opretter vi den med 0 stemmer.
            //vi kigger nu på hvert punkts label
            //er det et nyt label for os, er vi nødt til at sætte dets værdi tul nul. Ellers kan vi ikke lægge point til bagefter
            if (votes[n.label] === undefined) {
                votes[n.label] = 0
            }
            //Læg én stemme til den label naboen tilhører
            votes[n.label] += 1
        })
        //7. Find vinderen (den label med flest stemmer)
        //vi laver først en liste over alle labels, der har fået stemmer.
        //Object.keys giver os navnene på nøjlerne i et objekt, i dette tilfælde er det jo vores label
        var allLabels = Object.keys(votes)

        console.log(votes)

        //Start med at antage at første label er vinderen.
        var winner = allLabels[0]

        // Gå gennem alle labels med map og find den med flest stemmer.
        // løb alle labelsne igennem og se hvem der så virkelig er vinderen
        // Det er helt fint at første label bliver sammenlignet med sig selv.
        allLabels.map( l => {   // "l" er vores currentLabel
            // Hvis currentLabel har flere stemmer end nuværende winner,
            // så bliver currentLabel den nye winner.
            if (votes[l] > votes[winner]) {
                winner = l
            }
        })
        
        //
            console.log("Stemmer:", votes, "Vinder:", winner)

        // 8. Vis resultatet til brugeren
        select('#winner').html(winner)

        // VIGTIGT: Opdater grafen for at vise det nye punkt
        myChart.update()
    }