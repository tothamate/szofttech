window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("elore_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    kérdésBetöltés(questionId)
}
    var jóVálasz
    var questionId = 3

    
    function előre() {
        questionId++
        kérdésBetöltés(questionId)
        if (questionId == 860) {
            questionId = 1
        }
    }

    function vissza() {
        questionId--
        kérdésBetöltés(questionId)
        if (questionId == 0) {
            questionId = 859
        }
    }

    function kérdésMegjelenítés(kerdes) {
        if (!kerdes) return
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

    function kérdésBetöltés(id) {
        fetch(`/questions/${id}`)
            .then(válaszfeldolgozás)
            .then(kérdésMegjelenítés);
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
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jo");
    }
}
