function loadJson(path) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            sortedData = data.table.sort((a, b) => a.day-b.day);
            setupSchedule(sortedData)
        })
    }
function setupSchedule(data) {
    table = document.getElementById('emploiDuTemps').firstElementChild;
    var days = table.children;
    for (var i = 8; i < 20; i++) {
        let row = document.getElementById(i);
        for (var j = 0; j< 7; j++) {
            let cell = row.insertCell()
            cell.setAttribute('class', 'empty')
        }
    }
    data.forEach(function (event) {
        var row = document.getElementById(event.start);
        var cell = row.children[event.day]
        console.log(row);
        console.log(cell);
        for (var i = Number(event.start)+1; i < Number(event.end); i++) {
            let cellToKill = document.getElementById(i).children[event.day];
            console.log(i)
            console.log({cellToKill});
            if (typeof cellToKill != "undefined") {
            cellToKill.remove();
        }
        }
        if (typeof cell === "undefined") {
            row.insertCell();
        }
        cell.textContent = event.name;
        cell.setAttribute('rowspan',event.end-event.start);
        cell.setAttribute('class', event.class)

        cell.addEventListener('click',function(){
            highLight(cell.className);
        }, false);

    })

}

function highLight(className) {
    var elements = document.querySelectorAll(`td:not(.${className}):not(.heure):not(empty)`);
    console.log(elements);
    for (let i=0; i < elements.length; i++) {
        if (elements[i].style.visibility === "visible" || elements[i].style.visibility === "") {
        elements[i].style.visibility = "hidden";
    } else {
        elements[i].style.visibility = "visible";
    }
    }
}
