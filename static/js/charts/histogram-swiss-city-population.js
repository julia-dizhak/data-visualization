(function() {
    const margin = {top: 20, right: 10, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        
    const xScale = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    
    const yScale = d3.scaleLinear()
          .range([height, 0]);

    const svg = d3.select("#histogram-swiss-city-population")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");      
    
    d3.csv('./../static/csv/swiss-cities-population.csv').then(function(data) {
        data.forEach(function(d) {
            d.population = +d.population;
        });

        data.sort(function(a, b) {
            return a.population - b.population;
        });
       
        xScale.domain(data.map(function(d) { 
            return d.city; 
        }));

        yScale.domain([0, d3.max(data, function(datum) { 
            return datum.population; 
        })]);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")   
            .attr("x", function(d) { 
                return xScale(d.city); 
            })
            .attr("width", xScale.bandwidth())
            .attr("y", function(d) { 
                return yScale(d.population); 
            })
            .transition()
            .delay((datum) => datum.population * 2)
            .duration(800)
            .attr("height", function(datum) { 
                return height - yScale(datum.population); 
            });

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
    
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale));

    }).catch(function(error) {
        console.log(error);
    }); 

})();           