import React, {Component} from "react";
import * as d3 from 'd3';

class Scatter extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    var data = this.props.data;

    var margin = {top: 30, right: 10, bottom: 35, left: 30},
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var container = d3.select(".scatter_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.total_bill);
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    var y_data = data.map(item => item.tip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
            return x_scale(d.total_bill);
        })
        .attr("cy", function (d) {
            return y_scale(d.tip);
        })
        .attr("r", 3)
        .style("fill", "#69b3a2");

    container.append('text')
        .attr('x', w/2)
        .attr('y', h + 35)
        .text('Total Bill');

    container.append('text')
        .attr('x', -h/2)
        .attr('y', 0)
        .attr("transform", `rotate(270)`)
        .text('Tips');

    container.append('text')
        .attr('x', w/2)
        .attr('y', 0)
        .text('Total Bill vs Tips');
  }

  render(){
    return (
        <svg className="scatter_svg">
            <g className="g_1"></g>
        </svg>
    );
  }
}

export default Scatter;