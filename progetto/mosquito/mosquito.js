var idConf = 0
var config = readFileJson().config


//Cambia effettivamente la posizione della zanzara
function changePosition() {
    console.log("changePosition");
    console.log("changePosition/setPosition().x: " + setPosition().x);
    console.log("changePosition/setPosition().y: " + setPosition().y);
    d3.select("#mosquito")
        .transition()  
        .attr("transform", "translate(" + setPosition().x + "," + setPosition().y + ")")

    
};


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

//muove tutte le posizioni -> TODO: passare id per muovere solo nella posizione specifica
function play() {
    console.log("play");
    //for (var i=0; i<9; i++) {
        setTimeout(animate, 1000);//*i);
    //}
    //i=0                          
}


//Cambia la posizione della zanzara al click                  
function move(){
    console.log("move");
    document.querySelector("#svg").addEventListener("click", play);
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
    //for (var i=0; i<9; i++) {
    //    console.log("i: " + i);
    //    console.log("config[i]" + config[i].x + " "+ config[i].x);
    //}
    var pos = config[idConf]
    return { x: eval(pos.x), y: eval(pos.y)}
    
}
