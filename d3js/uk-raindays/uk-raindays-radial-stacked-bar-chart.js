// URL: https://observablehq.com/@monicagg/uk-raindays-radial-stacked-bar-chart
// Title: UK Raindays - Radial Stacked Bar Chart
// Author: Monica Guzik (@monicagg)
// Version: 248
// Runtime version: 1

const m0 = {
  id: "b752b62685ddb111@248",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# UK Raindays - Radial Stacked Bar Chart

Radial layouts are pretty, but may impede comparison, so consider them primarily to emphasize cyclical patterns. `
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","data","startCol","endColDiff","z","arc","xAxis","yAxis","legend"],
      value: (function(d3,DOM,width,height,data,startCol,endColDiff,z,arc,xAxis,yAxis,legend)
{
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

  svg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(startCol,data.columns.length-endColDiff))(data))
    .enter().append("g")
      .attr("fill", d => z(d.key))
    .selectAll("path")
    .data(d => d)
    .enter().append("path")
      .attr("d", arc);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);

  return svg.node();
}
)
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.csv("UK_raindays.csv", (d, _, columns) => {
  let total = 0;
  d.total = d[columns[columns.length-1]];
  return d;
})
)})
    },
    {
      name: "arc",
      inputs: ["d3","y","x","innerRadius"],
      value: (function(d3,y,x,innerRadius){return(
d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.Year))
    .endAngle(d => x(d.data.Year) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)
)})
    },
    {
      name: "x",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([0, 2 * Math.PI])
    .align(0)
)})
    },
    {
      name: "y",
      inputs: ["d3","data","innerRadius","outerRadius"],
      value: (function(d3,data,innerRadius,outerRadius)
{
  // This scale maintains area proportionality of radial bars!
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius * innerRadius, outerRadius * outerRadius]);
  return Object.assign(d => Math.sqrt(y(d)), y);
}
)
    },
    {
      name: "z",
      inputs: ["d3","data","startCol","endColDiff"],
      value: (function(d3,data,startCol,endColDiff){return(
d3.scaleOrdinal()
    .domain(data.columns.slice(startCol,data.columns.length-endColDiff))
    .range(["#98abc5", "#8a89a6", "#DAF7A6", "#239b56", "#1e8449", "#FF8C00", "#FFA500", "#FFD700", "#808000", "#d0743c", "#a05d56", "#7b6888"])
)})
    },
    {
      name: "xAxis",
      inputs: ["data","x","innerRadius"],
      value: (function(data,x,innerRadius){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", d => `
          rotate(${((x(d.Year) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (x(d.Year) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                ? "rotate(0)translate(-18,5)"
                : "rotate(-180)translate(18,5)")
            .text(d => d.Year)))
)})
    },
    {
      name: "yAxis",
      inputs: ["y"],
      value: (function(y){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.append("text")
        .attr("y", d => -y(y.ticks(5).pop()))
        .attr("dy", "-1em")
        .text("Rain days"))
    .call(g => g.selectAll("g")
      .data(y.ticks(5).slice(1))
      .enter().append("g")
        .attr("fill", "none")
        .call(g => g.append("circle")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.5)
            .attr("r", y))
        .call(g => g.append("text")
            .attr("y", d => -y(d))
            .attr("dy", "0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat(5, "s"))
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none")))
)})
    },
    {
      name: "legend",
      inputs: ["data","startCol","endColDiff","z"],
      value: (function(data,startCol,endColDiff,z){return(
g => g.append("g")
  .selectAll("g")
  .data(data.columns.slice(startCol,data.columns.length-endColDiff).reverse())
  .enter().append("g")
    .attr("transform", (d, i) => `translate(-40,${(i - (data.columns.length - startCol + endColDiff - 1) / 2) * 20})`)
    .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z))
    .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))
)})
    },
    {
      name: "startCol",
      value: (function(){return(
13
)})
    },
    {
      name: "endColDiff",
      value: (function(){return(
1
)})
    },
    {
      name: "width",
      value: (function(){return(
975
)})
    },
    {
      name: "height",
      inputs: ["width"],
      value: (function(width){return(
width
)})
    },
    {
      name: "innerRadius",
      value: (function(){return(
180
)})
    },
    {
      name: "outerRadius",
      inputs: ["width","height"],
      value: (function(width,height){return(
Math.min(width, height) / 2
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "b752b62685ddb111@248",
  modules: [m0]
};

export default notebook;
