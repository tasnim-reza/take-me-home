(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('barChart', barChart);

    barChart.$inject = [];

    function barChart() {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                label: "=",
                currentDataSet: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var labels = scope.label;
                var w = 320,                       // width and height, natch
                    h = 320;

                var svg = d3.select('[' + attrs.$attr.barChart + ']')
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                var g = svg.append("g")
                    .attr("transform", "translate(" + 40 + "," + 20 + ")");

                var x = d3.scaleBand().rangeRound([0, w]).padding(0.1),
                    y = d3.scaleLinear().rangeRound([h, 0]);

                function draw(data) {
                    // scale the range of the data
                    x.domain(data.days.map(function (d) { return d.day; }));
                    y.domain([0, d3.max(data.days, function (d) { return d.amount; })]);
                    
                    g.append("g")
                        .attr("class", "axis axis--x")
                        .attr("transform", "translate(0," + h + ")")
                        .call(d3.axisBottom(x));

                    g.append("g")
                        .attr("class", "axis axis--y")
                        .call(d3.axisLeft(y).ticks(10, "%"))
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .text("Frequency");

                    g.selectAll(".bar")
                        .data(data.days)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function (d) { return x(d.day); })
                        .attr("y", function (d) { return y(d.amount); })
                        .attr("width", x.bandwidth())
                        .attr("height", function (d) { return h - y(d.amount); });
                }

                var data = [
                    {
                        "request": "Amount of rainfall by day",
                        "days": [
                            {
                                "day": 1,
                                "amount": 50
                            }, {
                                "day": 2,
                                "amount": 10
                            }, {
                                "day": 7,
                                "amount": 10
                            }
                        ]
                    }
                ];

                draw(data[0])

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
