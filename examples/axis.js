var margin = {top: 0, right: 0, bottom: 250, left: 0},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    formatPercent = d3.format(".0%"),
    formatNumber = d3.format(".0f");

var t1 = new Date(2012, 0, 1),
    t2 = new Date(2013, 0, 1),
    t0 = d3.time.month.offset(t1, -1),
    t3 = d3.time.month.offset(t2, +1);

var x = d3.time.scale()
    .domain([t0, t3])
    .range([t0, t3].map(d3.time.scale()
      .domain([t1, t2])
      .range([0, width])));

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("#axis-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis)
  .selectAll("text")
    .attr("y", 6)
    .attr("x", 6)
    .style("text-anchor", "start");




var threshold = d3.scale.threshold()
    .domain([.11, .22, .33, .50])
    .range(["#6e7c5a", "#a0b28f", "#d8b8b3", "#b45554", "#760000"]);

// A position encoding for the key only.
var x2 = d3.scale.linear()
    .domain([0, 1])
    .range([0, 240]);

var xAxis = d3.svg.axis()
    .scale(x2)
    .orient("bottom")
    .tickSize(13)
    .tickValues(threshold.domain())
    .tickFormat(function(d) { return d === .5 ? formatPercent(d) : formatNumber(100 * d); });

var svg = d3.select("#axis-2")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
    .attr("class", "key")
//    .attr("transform", "translate(" + (width - 240) / 2 + "," + height / 2 + ")");

g.selectAll("rect")
    .data(threshold.range().map(function(color) {
      var d = threshold.invertExtent(color);
      if (d[0] == null) d[0] = x2.domain()[0];
      if (d[1] == null) d[1] = x2.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x2(d[0]); })
    .attr("width", function(d) { return x2(d[1]) - x2(d[0]); })
    .style("fill", function(d) { return threshold(d[0]); });

g.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("y", -6)
    .text("Percentage of stops that involved force");
