import React from "react";
import Chart from "react-google-charts";
class DynamicChart extends React.Component {
  render() {
    const { data } = this.props;
    const { chartType } = this.props;
    const chartData = [
      ["CGPA", "SGPA"],
      ...data.map(({ name, value }) => [name, value])
    ];

    return (
      <div className="chart">
        <Chart
          width={'100%'}
          height={"500px"}
          chartType={chartType}
          loader={<div style={{color:'white'}}>Loading Chart</div>}
          data={chartData}
          options={{
            title: "SGPA Chart",
            backgroundColor: '#ffffff',
            legendTextStyle: { color: '#000000' },
            titleTextStyle: { color: '#000000' },
            colors:['black'],
            hAxis: {
              textStyle:{color: '#000000'},
            },
            vAxis: {
              textStyle:{color: '#000000'},
            }
          }}
          rootProps={{ "data-testid": "1" }}
          
          
        />
      </div>
    );
  }
}

export default DynamicChart;