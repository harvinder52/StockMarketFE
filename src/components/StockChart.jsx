import CanvasJSReact from "@canvasjs/react-charts";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
const StockChart = ({ jsonData }) => {
  const timeSeriesData = jsonData["Time Series (Daily)"];
  const last10Entries = Object.entries(timeSeriesData).slice(0, 10);
  console.log(last10Entries);

  //   console.log(
  //     last10Entries.map((item) => {
  //       return { x: item[0], y: item[1]["3. low"] };
  //     })
  //   );

  const options = {
    title: {
      text: "Stock Data Chart",
    },
    axisX: {
      title: "Date",
      valueFormatString: "YYYY-MM-DD",
    },
    axisY: {
      title: "Value",
    },
    data: [
      {
        type: "line",
        name: "Open",
        showInLegend: true,
        dataPoints: last10Entries.map((item) => {
          return { x: new Date(item[0]), y: parseFloat(item[1]["1. open"]) };
        }),
      },
      {
        type: "line",
        name: "High",
        showInLegend: true,
        dataPoints: last10Entries.map((item) => {
          return { x: new Date(item[0]), y: parseFloat(item[1]["2. high"]) };
        }),
      },
      {
        type: "line",
        name: "Low",
        showInLegend: true,
        dataPoints: last10Entries.map((item) => {
          return { x: new Date(item[0]), y: parseFloat(item[1]["3. low"]) };
        }),
      },
      {
        type: "line",
        name: "Close",
        showInLegend: true,
        dataPoints: last10Entries.map((item) => {
          return { x: new Date(item[0]), y: parseFloat(item[1]["4. close"]) };
        }),
      },
    ],
  };

  return (
    <div>
      <h2>Stock Data Chart</h2>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default StockChart;
