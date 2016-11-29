import React 		from 'react'
import * as d3	from 'd3'

export default React.createClass({

	componentDidMount() {
    var margin = {top: 75, right: 75, bottom: 95, left: 120};
    var width  = 1000 - margin.left - margin.right;
	  var height = 500 - margin.top - margin.bottom;

    var data = this.props.data;

    var x = d3.scaleLinear().range([0, width])  .domain(d3.extent(data,   function(d) { return d.period; }));
    var y = d3.scaleLinear().range([height, 0]) .domain([0, d3.max(data,  function(d) { return d.value; })]);

		var svg = d3.select(this.refs.hook).append("svg:svg");
    svg.attr("preserveAspectRatio", "xMinYMin").attr("xmlns","http://www.w3.org/2000/svg").attr("version","1.1");
		svg.attr("viewBox", "0 0 1000 500");

    var line = d3.line();
    line.curve(d3.curveBasis);
    line.x(function(d) { return x(d.period);  });
    line.y(function(d) { return y(d.value);   });

    var axis_x = get_axis_x(x,y,width,height);
    var axis_y = get_axis_y(x,y,width,height);
    var grid_x = get_grid_x(x,y,width,height);
    var grid_y = get_grid_y(x,y,width,height);

    var graph = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    graph.append("g").attr("transform", "translate(0," + height + ")").call(grid_x).attr("class","grid");
    graph.append("g").call(grid_y).attr("class","grid");
    graph.append("g").attr("transform", "translate(0," + height + ")").call(axis_x).attr("class","axis");
    graph.append("g").call(axis_y).attr("class","axis");
    graph.append("path").data([data]).attr("class", "line").attr("d", line);

    graph.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .attr("class","chart-title")
        .attr("font-size", "35")
        .text("This is an amazing title");

    graph.append("text")
        .attr("x", (width / 2))
        .attr("y", height + (margin.bottom/1.2))
        .attr("text-anchor", "middle")
        .attr("font-size", "20")
        .attr("class","chart-axis-label")
        .text("This is an amazing x-axis label, [units]");

    graph.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height/2)
        .attr("y", 0 - margin.left + 20)
        .attr("text-anchor", "middle")
        .attr("class","chart-axis-label")
        .attr("font-size", "20")
        .text("This is an amazing y-axis label, [units]");


	},
	render() {
			// console.log(this.props.data);
    	return (
				<div>
					<p>This is the d3 visualization.</p>
					<div className="chart" ref='hook' />
				</div>
    	)
  	}
});

var get_axis_x = (x,y,width,height) => {
	var axis = d3.axisBottom(x);
  axis.tickPadding(10).tickSizeOuter(10).tickSizeInner(10);
  return axis;
};

var get_axis_y = (x,y,width,height) => {
	var axis = d3.axisLeft(y);
  axis.tickPadding(10).tickFormat(d3.format(".0%")).ticks(4);
  return axis;
};

var get_grid_x = (x,y,width,height) => {
	var axis = d3.axisBottom(x);
  axis.tickSizeInner(-height+1).tickFormat("");
  return axis;
};

var get_grid_y = (x,y,width,height) => {
	var axis = d3.axisLeft(y);
  axis.tickSizeInner(-width).tickFormat("").ticks(4);
  return axis;
};
