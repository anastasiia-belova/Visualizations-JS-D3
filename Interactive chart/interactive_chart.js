// Define margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 750 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;


// Define SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");
var uniVar;
var uniArray = [];


// Define x-axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Define y-axis
var y = d3.scale.linear()
    .range([height, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

// Define data
var person =d3.csv("data.csv", type, function(error, data) {
   x.domain(data.map(function(d) { return d.person; }));
  y.domain([0, d3.max(data, function(d) { return d.age; })]);
 
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.style("text-anchor", "end")
.attr("dy", ".71em")
.text("age");

// creating bar chart
svg.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.person); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.age); })
.attr("height", function(d) { return height - y(d.age); })
    

.on('mouseover',function(d){
      d3.selectAll("rect").style("fill", "lightblue");
      d3.select(this).style("fill", "blue");
       })
    
    .on('mouseout', function(d){d3.select(this).style("fill", "lightblue");})
    
   .on("click", function(d){
    
    document.getElementById("person").innerHTML =d.person;
    document.getElementById("age").innerHTML = d.age;
    console.log("Data", d);
    d3.selectAll("rect").style("opacity", 1);
    d3.select(this).style("fill","DarkViolet")    
    
    var yolo = data;
      writeUniArray();
      
      var uniIndex = uniArray.indexOf(d.university);
      
      console.log("index", uniIndex);
      console.log("index", uniArray);
       console.log(uniVar[uniIndex]);
    
      document.getElementById("uni").innerHTML = uniVar[uniIndex].university;
      document.getElementById("country").innerHTML = uniVar[uniIndex].country;
      document.getElementById("students").innerHTML = uniVar[uniIndex].students;
      document.getElementById("website").innerHTML = uniVar[uniIndex].website;
     
   
    })
});

function type(d) {
  d.age = +d.age;
  return d;
}

d3.csv("uni.csv", function(data){
    uniVar = data;
});


function writeUniArray(){
    for(var i=0; i<uniVar.length;i++){
        uniArray[i] = uniVar[i].university;
    }
    }

///// 
function content(elem){
    elem.style.backgroundColor = "red"                   
  //  var p = document.getElementById("person");
    // p.innerHTML = 'You clicked on cell:' + ''+ elem.innerText;
 }   
    
function mouseout(elem){
    elem.style.backgroundColor = "white"   
}


