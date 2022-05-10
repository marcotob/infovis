var margin = {top: 20, right: 20, bottom: 30, left: 40}; 


var width = 800 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
 

var delayTime = 1000, 
    updateTime = 500;
//var xAxis = d3.axisBottom();      
//var yAxis = d3.axisLeft(yScale).ticks(10);

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


function updateXScaleDomain(data) {
    console.log("updateXScaleDomain")
    var values = data["position"];
    xScale.domain(values.map(function(d) { return d.position.x}));
}

function updateYScaleDomain(data){
    console.log("updateYScaleDomain")
    var values = data["position"];
    yScale.domain(values.map(function(d){ return d.position.y}));
}

function updateDrawing(data){

    console.log("updateDrawing");

    var position = data.position["position"];

    console.log (data)
    element.exit().remove();

    element.enter()
        .attr("x", function(d) { return xScale(d.position.x); })
        .attr("y", function(d) { return yScale(d.position.y); });


    element.transition().duration(updateTime)
        .attr("x", function(d) { return xScale(d.position.x); })
        .attr("y", function(d) { return yScale(d.position.y); });

   
    yearNode.enter().append("text")
        .attr("class","year")
        .attr("x", width - margin.right)
        .attr("y", margin.top);

}



function drawAxes(){

    element.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    // draw the y-axis
    //
    element.append("g")
        .attr("class", "y axis");

    // add a label along the y-axis
    //
    element.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 15)
       .attr("font-size","15px")
       .style("text-anchor", "end")
       .text("Population (thousands)");
}

function redraw(data) {
    console.log("redraw");
    updateXScaleDomain(data);
    updateYScaleDomain(data);
    updateAxes();
    updateDrawing(data);
}

d3.json("data/dataset.json")
	.then(function(data) {
        console.log(data[0]);
        updateYScaleDomain(data[0]);
        updateXScaleDomain(data[0]);
        drawAxes();
    	updateDrawing(data[0]);

    	var counter = 0;
      console.log("counter " + counter);
    	setInterval(function(){
       		if (data[counter+1]){
              console.log("counter " + counter);
           		counter++;
           		redraw(data[counter]);
       		}
    	}, delayTime)
   	})
	.catch(function(error) {
		console.log(error); 
  	});