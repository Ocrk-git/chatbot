import React from "react";
import Chart from "react-google-charts";

const divStyle = {
  display: "flex",
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  width: "100vw",
};

const Analytics = () => {
  return (
    <div style={divStyle}>
      {/* geo chart */}
      <div style={{ display: "flex", flexDirection: "row" }}>

      <Chart
        margin={"400px"}
        color={"red"}
        width={"500px"}
        height={"300px"}
        chartType="GeoChart"
        data={[
          ["Country", "Popularity"],
          ["Germany", 200],
          ["United States", 300],
          ["Brazil", 400],
          ["Canada", 500],
          ["France", 600],
          ["RU", 700],
          ["IN", 900],
          ["Australia", 300],
          ["China", 500]
        ]}
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        mapsApiKey="YOUR_KEY_HERE"
        rootProps={{ "data-testid": "1" }}
        options={{
            // colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
            // backgroundColor: "black",
            datalessRegionColor: "",
          //   defaultColor: "red",
          colors: ["blue"],
        }}
      />

      {/* geo chart end */}

      {/* histograms  */}
      <Chart
        width={"600px"}
        height={"400px"}
        chartType="Histogram"
        loader={<div>Loading Chart</div>}
        data={[
          ["Dinosaur", "Length"],
          ["Acrocanthosaurus (top-spined lizard)", 12.2],
          ["Albertosaurus (Alberta lizard)", 9.1],
          ["Allosaurus (other lizard)", 12.2],
          ["Apatosaurus (deceptive lizard)", 22.9],
          ["Archaeopteryx (ancient wing)", 0.9],
          ["Argentinosaurus (Argentina lizard)", 36.6],
          ["Baryonyx (heavy claws)", 9.1],
          ["Brachiosaurus (arm lizard)", 30.5],
          ["Ceratosaurus (horned lizard)", 6.1],
          ["Coelophysis (hollow form)", 2.7],
          ["Compsognathus (elegant jaw)", 0.9],
          ["Deinonychus (terrible claw)", 2.7],
          ["Diplodocus (double beam)", 27.1],
          ["Dromicelomimus (emu mimic)", 3.4],
          ["Gallimimus (fowl mimic)", 5.5],
          ["Mamenchisaurus (Mamenchi lizard)", 21.0],
          ["Megalosaurus (big lizard)", 7.9],
          ["Microvenator (small hunter)", 1.2],
          ["Ornithomimus (bird mimic)", 4.6],
          ["Oviraptor (egg robber)", 1.5],
          ["Plateosaurus (flat lizard)", 7.9],
          ["Sauronithoides (narrow-clawed lizard)", 2.0],
          ["Seismosaurus (tremor lizard)", 45.7],
          ["Spinosaurus (spiny lizard)", 12.2],
          ["Supersaurus (super lizard)", 30.5],
          ["Tyrannosaurus (tyrant lizard)", 15.2],
          ["Ultrasaurus (ultra lizard)", 30.5],
          ["Velociraptor (swift robber)", 1.8],
        ]}
        options={{
          title: "Bhaskar semister wise performance",
          legend: { position: "none" },
          colors: ["skyblue"],
        }}
        rootProps={{ "data-testid": "1" }}
      />

      {/* bar chart  */}

      <Chart
  width={'500px'}
  height={'400px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
    
  ]}
  options={{
    title: 'Dheeraj semister wise performace',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
      </div>
      {/* histograms end  */}

      

      {/* pie chart  */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Chart
          width={"600px"}
          height={"500px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
    ['Task', 'Feedback'],
    ['Awesome', 11],
    ['Good', 2],
    ['Okay', 6],
    ['Not Satisfied', 20],
    ['Bad', 7],
  ]}
          options={{
            title: "My Daily Activities",
          }}
          rootProps={{ "data-testid": "1" }}
        />

<Chart
  width={'600px'}
  height={'500px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Source'],
    ['Desktop', 11],
    ['Mobile',6],
    ['Unkown', 2],
  ]}
  options={{
    title: 'My Daily Activities',
    // Just add this option
    pieHole: 0.4,
  }}
  rootProps={{ 'data-testid': '3' }}
/>

{/* table  */}
<Chart

  width={'500px'}
  height={'500px'}
  chartType="Table"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'string', label: 'Name' },
      { type: 'number', label: 'Salary' },
      { type: 'boolean', label: 'Full Time Employee' },
    ],
    ['Mike', { v: 10000, f: '$10,000' }, true],
    ['Jim', { v: 8000, f: '$8,000' }, false],
    ['Alice', { v: 12500, f: '$12,500' }, true],
    ['Bob', { v: 7000, f: '$7,000' }, true],
    ['Mike', { v: 10000, f: '$10,000' }, true],
    ['Jim', { v: 8000, f: '$8,000' }, false],
    ['Alice', { v: 12500, f: '$12,500' }, true],
    ['Bob', { v: 7000, f: '$7,000' }, true],
  ]}
  options={{
    showRowNumber: true,
  }}
  rootProps={{ 'data-testid': '1' }}
/>
      </div>

      <Chart
  width={'1000px'}
  height={'400px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['x', 'dogs', 'cats'],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
    [8, 0, 0],
    [9, 10, 5],
    [10, 23, 15],
    [11, 17, 9],
    [12, 18, 10],
    [13, 9, 5],
    [14, 11, 3],
    [15, 27, 19],
  
  ]}
  options={{
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    series: {
      1: { curveType: 'function' },
    },
  }}
  rootProps={{ 'data-testid': '2' }}
/>
    </div>
  );
};

export default Analytics;
