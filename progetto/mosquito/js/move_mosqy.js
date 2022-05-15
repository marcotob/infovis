var margin = {top: 20, right: 20, bottom: 30, left: 40}; 


var width = 800 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
 

var delayTime = 1000, 
    updateTime = 500; 
var i = 1;
//var element = document.getElementById("silhouette");

var element = d3.select("body").append("silhouette")
    .attr("width", width + margin.left + margin.right)     // i.e., 800 again 
    .attr("height", height + margin.top + margin.bottom)   // i.e., 300 again
    .append("g")                                           // g is a group
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");                                                    

var body = d3.select("body");

console.log("primo log");

var xScale = d3.scaleLinear().range([width, 0]);         
var yScale = d3.scaleLinear().range([height, 0]);
var yDomain = d3.scaleLinear().domain(0,110);
var xDomain = d3.scaleLinear().domain(0,100);


function updateDrawing(data){

    console.log("updateDrawing");
    var position = data["position"];
    myArray = position.map(function(el){console.log(el.x + " ; " + el.y)});
    console.log (position)

    element.exit().remove();
}


function redraw(data) {
    console.log("redraw");
    i = i+1;
    console.log (i);
    updateXScaleDomain(data);
    updateYScaleDomain(data);
    updateAxes();
    updateDrawing(data);
}

d3.json("data/dataset.json")
  .then(function(data) {
      console.log(data[0]);
      updateDrawing(data[0]);
    })
  .catch(function(error) {
    console.log(error); 
    });