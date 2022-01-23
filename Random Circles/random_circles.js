// 1.1 Create SVG and set height and width.
var svgWidth = 600, svgHeight = 600;
var svg = d3.select('svg')
.attr('width', svgWidth)
.attr('height', svgHeight)
.attr('class', 'svg-container');


// 1.2 Create 4 circles with different radius and color for each of them.

data =  [
        {"cx": 30, "cy": 200, "radius":  Math.round(Math.random() * 100)} , 
    {"cx": 300, "cy": 90, "radius":  Math.round(Math.random() * 100)}, 
    {"cx": 250, "cy": 400, "radius":  Math.round(Math.random() * 100)},
    {"cx": 70, "cy": 60, "radius":  Math.round(Math.random() * 100)},  
];

var circles = svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("id", function(d,i){return "id_" + i.toString();})
//.attr("cx", function(d,i) { return  data[i][0]; }) // Math.random() * svgWidth
.attr("cx", function (d) { return d.cx; })
//.attr("cy", function(d,i) { return  data[i][1]; }) // Math.random() * svgHeight
.attr("cy", function (d) { return d.cy; })
//.attr("r", function() { return Math.random() * 100; })
//.attr("r", function(d,i) { return  data[i][2]; })
.attr("r", function (d) { return d.radius; })
.attr("fill", function (d,i)
{
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(color.length < 6) {
        color = "0" + color + i.toString();
    }
    return "#" + color;
});

// 1.3 Add transition() to change the color of circles to black.

d3.selectAll("circle")
.transition()
.delay(function (d, i) {return i*100; })
.duration(750)
.attr("fill", "#000000");

// 1.4 Add text below each circle and display radius of them.


//Add the SVG Text Element to the svgContainer
var text = svg.selectAll("text")
                        .data(data)
                        .enter()
                        .append("text");

//Add SVG Text Element Attributes
var textLabels = text
                .transition()
                 //.attr("x", function(d,i) { return  data[i][0];})
                .attr("x", function(d) { return d.cx; })
                 //.attr("y", function(d,i) { return  data[i][1]; })
                .attr("y", function(d) { return d.cy + d.radius+15; })
                 //.text( function (d,i) { return data[i][3] ; })
                 .text( function (d) { return "radius : " + d.radius ; })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "red")
                .delay(function (d, i) {return i*300; });
