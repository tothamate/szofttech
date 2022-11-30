window.onload = () => {
    const rootElem = document.createElement("div");
    rootElem.classList.add("pascal");

    document.body.appendChild(rootElem);
    var n = 1;

    const firstRow = document.createElement("div");
    firstRow.classList.add("sor");
    var tmp = document.createElement("div");
    tmp.classList.add("div");
    tmp.innerText = "1";
    firstRow.appendChild(tmp);
    rootElem.appendChild(firstRow);

    const secondRow = document.createElement("div");
    secondRow.classList.add("sor");
    tmp = document.createElement("div");
    tmp.classList.add("elem");
    tmp.innerText = "1";
    secondRow.appendChild(tmp);
    tmp = document.createElement("div");
    tmp.classList.add("elem");
    tmp.innerText = "1";
    secondRow.appendChild(tmp);
    rootelem.appendChild(secondRow);

    for (var i = 2; i < 10; i++) {
        n = n * (i);
        const row = document.createElement("div");
        row.classList.add("sor");
        for (var j = 0; j <= i; j++) {
            var k = factorial(j);
            var nk = factorial(i - j);
            var val = n / (k + nk);
            const col = document.createElement("div");
            col.classList.add("elem");
            col.innerText = val;
            row.appendChild(col);
        }
        rootElem.appendChild(row);
    }
}

function factorial(n) {
    if (n == 0) {
        return 1;
    }
    result = 1;
    for (var i = 1; i < = n; i++) {
        result = result * i;
    }
    return result;
}