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

    var container = d3.select(".bar_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.day);
    x_data = [...new Set(x_data)]
    const x_scaleL = d3.scaleBand().domain(x_data).range([margin.left, w]);
    const x_scale = d3.scaleBand().domain(x_data).range([margin.left + 20, w]);
    container.selectAll(".x_axis_g2").data([0]).join('g').attr("class", 'x_axis_g2')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scaleL));

    var y_data = [];
    var new_data = [[]];
    x_data.forEach(element => {
        var dayTips = data.filter(item => item.day === element);
        var tipsArr = dayTips.map(item => item.tip);
        var averageTip = tipsArr.reduce((a,b) => a + b) / tipsArr.length;
        y_data.push(averageTip);
        new_data.push([element, averageTip]);
    });
    new_data = new_data.slice(1, 5)
    console.log(new_data);
    
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g2").data([0]).join('g').attr("class", 'x_axis_g2')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll("rect")
        .data(new_data)
        .join("rect")
        .attr("x", function (d) {
            return x_scale(d[0]) * 1.05;
        })
        .attr("y", function (d) {
            return y_scale(d[1]);
        })
        .attr("width", 60)
        .attr("height", function (d) {
            return h - y_scale(d[1]);
        })
        .style("fill", "#69b3a2");

    container.append('text')
        .attr('x', w/2)
        .attr('y', h + 30)
        .text('Day');

    container.append('text')
        .attr('x', -h/2 -20)
        .attr('y', 0)
        .attr("transform", `rotate(270)`)
        .text('Average Tip');

    container.append('text')
        .attr('x', w/2)
        .attr('y', 0)
        .text('Average Tip by Day');
  }

  render(){
    return (
        <svg className="bar_svg">
            <g className="g_2"></g>
        </svg>
    );
  }
}

export default Scatter;