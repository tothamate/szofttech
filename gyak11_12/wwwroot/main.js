var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

window.onload = function (e) {
    init();
    console.log("Oldal betöltve...");
    document.getElementById("elore_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
}

    var jóVálasz
    var questionId = 1


function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}
    
function előre() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

    function vissza() {
        displayedQuestion--;
        if (displayedQuestion == -1) displayedQuestion = questionsInHotList-1;
        kérdésMegjelenítés()
    }

    function kérdésMegjelenítés() {
        let kerdes = hotList[displayedQuestion].question;
        console.log(kerdes);
        document.getElementById("kérdés_szöveg").innerText = kerdes.question1
        document.getElementById("válasz1").innerText = kerdes.answer1
        document.getElementById("válasz2").innerText = kerdes.answer2
        document.getElementById("válasz3").innerText = kerdes.answer3
        jóVálasz = kerdes.correctAnswer
        if (kerdes.image != "") {
            document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
            document.getElementById("kép1").classList.remove("rejtett")
        }
        else {
            document.getElementById("kép1").classList.add("rejtett")
        }
        document.getElementById("válasz1").classList.remove("jo", "rossz");
        document.getElementById("válasz2").classList.remove("jo", "rossz");
        document.getElementById("válasz3").classList.remove("jo", "rossz");
    }

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

    function válaszfeldolgozás(válasz) {
        if (!válasz.ok) {
            console.error(`Hibás válasz: ${response.status}`)
        }
        else {
            return válasz.json()
        }
}

function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jo");
        hotList[displayedQuestion].goodAnswers = 0;
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
}
