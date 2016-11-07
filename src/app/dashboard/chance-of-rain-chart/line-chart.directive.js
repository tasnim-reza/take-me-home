(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('lineChart', lineChart);

    lineChart.$inject = [];

    function lineChart() {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                label: "=",
                currentDataSet: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var labels = scope.label;
                var w = 400,                       // width and height, natch
                    h = 350;

                var svg = d3.select('[' + attrs.$attr.lineChart + ']')
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                var g = svg.append("g")
                    .attr("transform", "translate(" + 40 + "," + 20 + ")");

                var x = d3.scaleTime().range([0, w]),
                    y = d3.scaleLinear().range([h, 0]),
                    z = d3.scaleOrdinal(d3.schemeCategory10);

                var line = d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) { return x(d.day); })
                    .y(function (d) { return y(d.amount); });

                function draw(data) {

                    var mappedData = ['day', 'lower', 'mean', 'upper'].map(function (id) {
                        return {
                            id: id,
                            values: data.map(function (d) {
                                return { day: d.day, amount: d[id] };
                            })
                        };
                    });
                    
                    x.domain(d3.extent(data, function (d) { return d.day; }));

                    y.domain([
                        d3.min(mappedData, function (c) { return d3.min(c.values, function (d) { return d.amount; }); }),
                        d3.max(mappedData, function (c) { return d3.max(c.values, function (d) { return d.amount; }); })
                    ]);

                    z.domain(mappedData.map(function (c) { return c.id; }));

                    g.append("g")
                        .attr("class", "axis axis--x")
                        .attr("transform", "translate(0," + h + ")")
                        .call(d3.axisBottom(x));

                    g.append("g")
                        .attr("class", "axis axis--y")
                        .call(d3.axisLeft(y))
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("fill", "#000")
                        .text("Percentage, %");

                    var bound = g.selectAll(".bound")
                        .data(mappedData)
                        .enter().append("g")
                        .attr("class", "bound");

                    bound.append("path")
                        .attr("class", "line")
                        .attr("d", function (d) { return line(d.values); })
                        .style("stroke", function (d) { return z(d.id); });

                    bound.append("text")
                        .datum(function (d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
                        .attr("transform", function (d) { return "translate(" + x(d.value.day) + "," + y(d.value.amount) + ")"; })
                        .attr("x", 3)
                        .attr("dy", "0.35em")
                        .style("font", "10px sans-serif")
                        .text(function (d) { return d.id; });
                }

                var data = [
                    {
                        "lower": 10,
                        "mean": 15,
                        "upper": 30,
                        "day": 1
                    },
                    {
                        "lower": 12,
                        "mean": 20,
                        "upper": 40,
                        "day": 2
                    },
                    {
                        "lower": 25,
                        "mean": 30,
                        "upper": 60,
                        "day": 7
                    }
                ];

                draw(data)

                scope.$watch('data', function (oldVal, newVal) {
                    if (oldVal) {
                        svg.selectAll("*").remove();

                        draw(scope.data);
                    }
                });
            }
        }
    };
})();
