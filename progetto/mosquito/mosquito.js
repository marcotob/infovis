var idConf = 0
var config = readFileJson().config


//Cambia effettivamente la posizione della zanzara in avanti
function changePosition() {
    console.log("changePosition");
    console.log("changePosition/setPosition().x: " + setPosition().x);
    console.log("changePosition/setPosition().y: " + setPosition().y);
    d3.select("#mosquito")
        .transition()  
        .attr("transform", "translate(" + setPosition().x + "," + setPosition().y + ")")

    
};

//Cambia effettivamente la posizione della zanzara indietro
function backChangePosition() {
    console.log("backChangePosition");
    console.log("backChangePosition/setPosition().x: " + setPosition().x);
    console.log("backChangePosition/setPosition().y: " + setPosition().y);
    d3.select("#mosquito")
        .transition()  
        .attr("transform", "translate(" + setPosition().x + "," + setPosition().y + ")")

    
};

//gestisco ciclicità idConf in avanti
function animate(){   
    console.log("animate");                     
    if (idConf===9) {
            idConf = 0
        } else {
            idConf +=1
        }
    console.log("idConf: " + idConf);
    changePosition();
}

//gestisco ciclicità idConf indietro
function backAnimate(){   
    console.log("backAnimate");                     
    if (idConf===0) {
            idConf = 9
        } else {
            idConf -=1
        }
    console.log("idConf: " + idConf);
    backChangePosition();
}

//muove avanti con un ritardo
function play() {
    console.log("play");
        setTimeout(animate, 1000);                         
}

//muove indietro con un ritardo
function backPlay() {
    console.log("backPlay");
        setTimeout(backAnimate, 1000);                       
}

//intercetta sx click                  
function move(){
    console.log("move");
    document.querySelector("#svg").addEventListener("click", play);
}

//intercetta dx click                  
function backMove(){
    console.log("backMove");
    document.querySelector("#svg").addEventListener("contextmenu", backPlay);
}


//Disegnare la prima posizione
function drawmosquito(){
    console.log("drawmosquito");
    console.log("drawmosquito/setPosition().x: " + setPosition().x);
    console.log("drawmosquito/setPosition().y: " + setPosition().y);
    console.log("idConf: " + idConf);
    var svg= d3.select("svg")
        svg.append("svg:image")
        .attr("xlink:href", "immagini/silhouette.svg")
        .attr("id", "mosquito")
		.attr("width", 100)
		.attr("height", 100)
		.attr("orientation", 0)
        .attr("transform", "translate("+setPosition().x+","+setPosition().y+") rotate(0)")

}

//Rimozione bottone iniziale
function removeButton() {
    console.log("removeButton");
    var elem = document.getElementById('button');
    elem.parentNode.removeChild(elem);
    return false;
}

function start() {
    console.log("start");
    removeButton();
    drawmosquito();
    move();
    backMove();
}


//legge configurazione
function readFileJson(){
    console.log("readFileJson");
    return $.ajax({
    type: 'GET',
    url: 'configuration.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Error: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}


function setPosition() {
    console.log("setPosition");
    console.log("idConf: " + idConf);
    var pos = config[idConf]
    return { x: eval(pos.x), y: eval(pos.y)}
}
