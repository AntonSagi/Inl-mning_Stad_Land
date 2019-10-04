window.onload = getLand();


var städerSE = [];
var städerFI = [];
var städerNO = [];

var befSE = [];
var befFI = [];
var befNO = [];

var landJson = [];
var stadJson = [];

var stadIdSe = [];
var stadIdFi = [];
var stadIdNo = [];

var sePrint = false;
var fiPrint = false;
var noPrint = false;

var sePrintedPrev = false;
var fiPrintedPrev = false;
var noPrintedPrev = false;

var printSeInfo = false;
var printFiInfo = false;
var printNoInfo = false;

var träffatFolk = [];

var printSeStad = false;
var printFiStad = false;
var printNoStad = false;


function getLand() {
    fetch("land.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendLand(data);
        landJson = data;
    })
    .catch(function(err) {
        console.log(err);
    })
}

function getStad() {
    fetch("stad.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendStäder(data);
        stadJson = data;
    })
    .catch(function(err) {
        console.log(err);
    })
}


function appendLand(data) { //Skriv ut de olika länderna när hemsidan laddas in
    var navLand = document.getElementById("nav_head");

    for (var i = 0; i < data.length; i++){
        var landItem = document.createElement("li");
        landItem.innerHTML = "<a onclick=städer"+data[i].countryname+"() class=nav-link>"+data[i].countryname+"</a>";
        landItem.id = data[i].id;
        landItem.className = "nav-item";
        navLand.appendChild(landItem);
    }
}

function appendStäder(data) { //Skriv ut städer när besökaren klickar på ett land 


    for (var i = 0; i < data.length; i++) {
        if(printSeStad === true) {
            if(data[i].countryid === landJson[0].id) {
                städerSE.push(data[i].stadname)
                stadIdSe.push(data[i].id)
                befSE.push(data[i].population)
                if(sePrint === true && sePrintedPrev === false){
                    var skriv = document.getElementById("städerSE");
                    var seLista = document.createElement("h4");
                    seLista.innerHTML = data[i].stadname;
                    seLista.id = data[i].id;
                    seLista.addEventListener("click", stadInfo, this.id);
                    skriv.appendChild(seLista);
                }
            }
            printSeInfo = true;
        }
        
        else if(printFiStad === true) {
                if(data[i].countryid === landJson[1].id) {
                    städerFI.push(data[i].stadname)
                    stadIdFi.push(data[i].id)
                    if(fiPrint === true && fiPrintedPrev === false) {
                        var skriv = document.getElementById("städerFI");
                        var fiLista = document.createElement("h4");
                        fiLista.innerHTML = data[i].stadname;
                        fiLista.id = data[i].id;
                        fiLista.addEventListener("click", stadInfo, this.id);
                        skriv.appendChild(fiLista);
                }
            }
            printFiInfo = true;
        }
        

        else if(printNoStad === true) {
                if(data[i].countryid === landJson[2].id) {
                städerNO.push(data[i].stadname)
                stadIdNo.push(data[i].id)
                if(noPrint === true && noPrintedPrev === false) {
                    var skriv = document.getElementById("städerNO");
                    var noLista = document.createElement("h4");
                    noLista.innerHTML = data[i].stadname;
                    noLista.id = data[i].id;
                    noLista.addEventListener("click", stadInfo, this.id);
                    skriv.appendChild(noLista);
            }
        }
        printNoInfo = true;
    }
    }   
    sePrint = false;
    fiPrint = false;
    noPrint = false;

    sePrintedPrev = true;
    fiPrintedPrev = true;
    noPrintedPrev = true;

    printSeStad = false;
    printFiStad = false;
    printNoStad = false;
}

function stadInfo() {
    var currentStad = this.id;
    var currentInt = parseFloat(currentStad);
    var temp;

    document.getElementById("städerSE").innerHTML = "";
    document.getElementById("städerFI").innerHTML = "";
    document.getElementById("städerNO").innerHTML = "";
    var textAppend = document.getElementById("infoContent");
    var info = document.createElement("h4");
    var besökt = document.createElement("button");

        for (i = 0; i < stadJson.length; i++) {
            if(currentInt === stadJson[i].id) {

                var textAppend = document.getElementById("infoContent");
                var info = document.createElement("h4");
                var besökt = document.createElement("button");

                if(printSeInfo === true){
                    info.innerHTML = stadJson[i].stadname + " Är en stad i Sverige med " + stadJson[i].population + " st invånare";
                    besökt.innerHTML = "Jag har besökt " + stadJson[i].stadname;
                }
                else if(printFiInfo === true){
                    info.innerHTML = stadJson[i].stadname + " Är en stad i Finland med " + stadJson[i].population + " st invånare";
                    besökt.innerHTML = "Jag har besökt " + stadJson[i].stadname;
                }
                else if(printNoInfo === true){
                    info.innerHTML = stadJson[i].stadname + " Är en stad i Norge med " + stadJson[i].population + " st invånare";
                    besökt.innerHTML = "Jag har besökt " + stadJson[i].stadname;
                }

                var temp = i;

                besökt.addEventListener("click", function() {
                    localStorage.setItem(stadJson[temp].stadname, stadJson[temp].stadname);
                    besökt.style.display = "none";
                })

                textAppend.appendChild(info);
                textAppend.appendChild(besökt);
            }
        }
        printSeInfo = false;
        printFiInfo = false;
        printNoInfo = false;
}


function städerSverige() {
    var mainHide = document.getElementById("mainPage");
    mainHide.style.display = "none";
    document.getElementById("infoContent").innerHTML = "";
    document.getElementById("städerSE").innerHTML = "";
    document.getElementById("städerFI").innerHTML = "";
    document.getElementById("städerNO").innerHTML = "";
    fiPrintedPrev = false;
    noPrintedPrev = false;
    sePrintedPrev = false;

        if(sePrintedPrev === false) {
            var seTitel = document.getElementById("städerSE");
            var titel = document.createElement("h1");
            titel.innerHTML = "Vänligen klicka på en stad";
            seTitel.appendChild(titel);
        }

    sePrint = true;
    printSeStad = true;

    getStad();
}

function städerFinland() {
    var mainHide = document.getElementById("mainPage");
    mainHide.style.display = "none";
    document.getElementById("infoContent").innerHTML = "";
    document.getElementById("städerFI").innerHTML = "";
    document.getElementById("städerSE").innerHTML = "";
    document.getElementById("städerNO").innerHTML = "";
    sePrintedPrev = false;
    noPrintedPrev = false;
    fiPrintedPrev = false;

    if(fiPrintedPrev === false){
        var fiTitel = document.getElementById("städerFI");
        var titel = document.createElement("h1");
        titel.innerHTML = "Vänligen klicka på en stad";
        fiTitel.appendChild(titel);
    }

    fiPrint = true;
    printFiStad = true;
    getStad();
}

function städerNorge() {
    var mainHide = document.getElementById("mainPage");
    mainHide.style.display = "none";
    document.getElementById("infoContent").innerHTML = "";
    document.getElementById("städerFI").innerHTML = "";
    document.getElementById("städerSE").innerHTML = "";
    document.getElementById("städerNO").innerHTML = "";
    sePrintedPrev = false;
    fiPrintedPrev = false;
    noPrintedPrev = false;

    if(noPrintedPrev === false){
        var noTitel = document.getElementById("städerNO");
        var titel = document.createElement("h1");
        titel.innerHTML = "Vänligen klicka på en stad";
        noTitel.appendChild(titel);
    }

    noPrint = true; 
    printNoStad = true;
    getStad();
}

function homePage() {
    document.getElementById("städerSE").innerHTML = "";
    document.getElementById("städerFI").innerHTML = "";
    document.getElementById("städerNO").innerHTML = "";

    var infoHide = document.getElementById("infoContent");
    infoHide.innerHTML = "";

    var mainHide = document.getElementById("mainPage");
    mainHide.style.display = "block";
    sePrintedPrev = false;
    fiPrintedPrev = false;
    noPrintedPrev = false;
}