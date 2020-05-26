// https://observablehq.com/@monicagg/uk-raindays-radial-stacked-bar-chart@289
export function chart(runtime, observer) {
  const main = runtime.module(); 
  
  main.variable(observer()).define(["md", "object"], function(md,object){return(
md`# UK Raindays - ${object.title}

Circular barplots are pretty, they are primarily use to present obvious cyclical patterns in large rows of data. 

Below, starting from center, each year is compound by the numer of raindays in winter, spring, summer, autumn. 

In term of comparison, first bar shows raindays in winter in different years, and the stacked bars illustrate changes for a whole year.`
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","data","startCol","endColDiff","z","arc","xAxis","yAxis","legend","object"], function(d3,DOM,width,height,data,startCol,endColDiff,z,arc,xAxis,yAxis,legend,object)
{
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "9px sans-serif");

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
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.text("https://raw.githubusercontent.com"
    + "/monicagg/learn-practice/master"
    + "/d3js/uk-raindays/UK_raindays.txt").then(function(text) {
      let rows = d3.dsvFormat("\n").parseRows(text);
      let data = [], i=0;
      data.columns = [];
      rows.forEach( row => {
        //console.log("row - " + typeof row[0] + " " + row[0]);
        const year = row[0].slice(0,4);
        const elems = row[0].split(' ');
        if (year.startsWith("year")) {
          elems.forEach( elem => {
            if (elem.trim().length>0) {
                data.columns.push(elem.valueOf());
            }  
          });
          //console.log("data.columns - " + data.columns);
        }
        if (!Number.isNaN(Number.parseInt(year))) {
          let j=0;
          let strElem = "data[" + i + "] = { ";
          elems.forEach( elem => {
            if (elem.trim().length>0) {
              strElem = strElem.concat(JSON.stringify(data.columns[j]) + ": \"" + elem + "\",");
              j++;
            }
          });
          strElem = strElem.concat(" }");
          //console.log("strElem - " + strElem);
          eval(strElem);
          i++;
        }
      });
      return data;
     })
)});
  main.variable(observer("arc")).define("arc", ["d3","y","x","innerRadius"], function(d3,y,x,innerRadius){return(
d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.year))
    .endAngle(d => x(d.data.year) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)
)});
  main.variable(observer("x")).define("x", ["d3","data"], function(d3,data){return(
d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, 2 * Math.PI])
    .align(0)
)});
  main.variable(observer("y")).define("y", ["d3","data","innerRadius","outerRadius","startCol","endColDiff"], function(d3,data,innerRadius,outerRadius,startCol,endColDiff)
{
  // This scale maintains area proportionality of radial bars!
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        if (endColDiff===1 && startCol===13) {
            return +d[data.columns[data.columns.length-1]];
        }
        let colSum = 0;
        for (let i=startCol;i<data.columns.length-endColDiff;i++) {
          colSum+= +d[data.columns[i]];    
          }
        return colSum;
        }
        )])
      .range([innerRadius * innerRadius, outerRadius * outerRadius]);
  return Object.assign(d => Math.sqrt(y(d)), y);
}
);
  main.variable(observer("z")).define("z", ["d3","data","startCol","endColDiff"], function(d3,data,startCol,endColDiff){return(
d3.scaleOrdinal()
    .domain(data.columns.slice(startCol,data.columns.length-endColDiff))
    .range(["#98abc5", "#DAF7A6", "#239b56", "#FF8C00", "#FFA500", "#FFD700", "#808000", "#d0743c", "#a05d56", "#7b6888", "#8a89a6", "#1e8449"])
)});
  main.variable(observer("xAxis")).define("xAxis", ["data","x","innerRadius"], function(data,x,innerRadius){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", d => `
          rotate(${((x(d.year) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -3)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (x(d.year) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                ? "rotate(0)translate(-12,3)"
                : "rotate(-180)translate(12,3)")
            .attr("font-size", "64%")
            .text(d => d.year)))
)});
  main.variable(observer("yAxis")).define("yAxis", ["y"], function(y){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.append("text")
        .attr("y", d => -y(y.ticks(5).pop()))
        .attr("dy", "-0.7em")
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
)});
  main.variable(observer("legend")).define("legend", ["data","startCol","endColDiff","z"], function(data,startCol,endColDiff,z){return(
g => g.append("g")
  .selectAll("g")
  .data(data.columns.slice(startCol,data.columns.length-endColDiff).reverse())
  .enter().append("g")
    .attr("transform", (d, i) => `translate(-30,${(i - (data.columns.length - startCol + endColDiff - 1) / 2) * 20})`)
    .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z))
    .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))
)});
  main.variable(observer("startCol")).define("startCol",["object"], function(object) {
    if (object.season==='spr') {
        return(14);
    } else if (object.season==='sum') {
        return(15);
    } else if (object.season==='aut') {
        return(16);
    }
    return(13);
    });
  main.variable(observer("endColDiff")).define("endColDiff", ["object"], function(object){
    if (object.season==='win') {
        return(4);
    } else if (object.season==='spr') {
        return(3);
    } else if (object.season==='sum') {
        return(2);
    } else if (object.season==='aut') {
        return(1);
    }
    return(1);
  });
  main.variable(observer("width")).define("width", function(){return(
686
)});
  main.variable(observer("height")).define("height", function(){return(
460
)});
  main.variable(observer("innerRadius")).define("innerRadius", function(){return(
129
)});
  main.variable(observer("outerRadius")).define("outerRadius", ["width","height"], function(width,height){return(
Math.min(width, height) / 2
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  
  return main;
}
