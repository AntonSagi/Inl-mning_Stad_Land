window.onload = getStad();


var träffatSum = [];
var x = 0;
var y = 0;
var tempStad = [];


function getStad() {
    fetch("stad.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        getBesökt(data);
        stadinfo = data;
    })
    .catch(function(err) {
        console.log(err);
    })
}

function getBesökt(data) {
    var städer = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while( i-- ) {
        städer.push( localStorage.getItem(keys[i]) );
    }
    var temp = städer.length - 1;

    var listaBesökt = document.getElementById("lista");
    for ( i = 0; i <= temp; i++ ){
        var listaPrint = document.createElement("h4");
        listaPrint.innerHTML = städer[i] + "<br>";
        tempStad.push(städer[i]);
        listaBesökt.appendChild(listaPrint);
    }

    if(localStorage.length > 0){
        var textTräffat = document.getElementById("lista");
        var träffat = document.createElement("h1");
        träffat.innerHTML = "Du kan ha träffat såhär många människor i varje ovanstående stad";
        textTräffat.appendChild(träffat);
    }

    while (x < data.length){
        var printPop = document.getElementById("lista");

        if (tempStad[y] === data[x].stadname){
            var siffra = data[x].population;
            console.log(siffra);
            y++;
            x = 0;
            träffatSum.push(data[x].population);
            var skrivTräffat = document.createElement("h4");
            skrivTräffat.innerHTML = siffra + " st människor";
            printPop.appendChild(skrivTräffat);
        }
        else{
            x++;
        }
    }
    addBtn();
}

function addBtn() {
    var appBtn = document.getElementById("lista");
    var btn = document.createElement("button");
        btn.innerHTML = "rensa historien";
        btn.addEventListener("click", function() {
            localStorage.clear();
            träffatSum = [];
            x = 0;
            y = 0;
            tempStad = [];
            location.reload();
        });
    appBtn.appendChild(btn);
        
}