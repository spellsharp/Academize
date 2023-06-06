import React from "react";
import Chart from "react-google-charts";

class DynamicChart extends React.Component {
  render() {
    const { data } = this.props;

    const subjects = [...new Set(data.map(item => item.name))];
    const semesters = Array.from(Array(12).keys()).map(i => `Semester ${i+1}`); 

    const chartData = [
      ["Subject", ...semesters], // first row with semester names
      ...subjects.map(subject => { 
        const row = [subject]; // start the row with the subject name
        for (let i = 1; i <= 12; i++) { // add marks for each semester
          const item = data.find(item => item.name === subject && item.semester === i);
          row.push(item ? item.value : 0); // push the mark or null if no mark exists
        }
        return row;
      })
    ];
    const colors = ["#EF6C00", "#FDD835", "#1E88E5", "#3949AB", "#8E24AA", "#00897B", "#E53935", "#5E35B1", "#43A047", "#FF5722", "#D81B60", "#6D4C41"];
    console.log(chartData);

    const chartOptions = {
      title: "SGPA Chart",
      backgroundColor: '#FFF',
      legendTextStyle: { color: '#000000' },
      titleTextStyle: { color: '#000000' },
      colors: colors,
      hAxis: {
        textStyle: { color: '#000000' },
      },
      vAxis: {
        textStyle: { color: '#000000' },
      },
      series: semesters.reduce((obj, semester, index) => {
        obj[index] = { color: colors[index] };
        return obj;
      }, {}),
    };

    return (
      <div className="chart">
        <Chart
          width={'100%'}
          height={"500px"}
          chartType="BarChart"
          loader={<div style={{ color: 'white' }}>Loading Chart</div>}
          data={chartData}
          options={chartOptions}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }
}

export default DynamicChart;