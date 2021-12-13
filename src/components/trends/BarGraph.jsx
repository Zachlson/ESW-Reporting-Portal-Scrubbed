import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";

const BarGraph = ({ barData, barKeys, barLegend }) => {
  return (
    <BarGraphContainer>
      <ResponsiveBar
        data={barData}
        keys={barKeys}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        isInteractive={true}
        enableLabel={false}
        theme={theme}
        colors={{ scheme: "category10" }} //This argument handles the graph's colors. Check nivo documentation for available palettes
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendPosition: "middle",
          legendOffset: 42,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: barLegend,
          legendPosition: "middle",
          legendOffset: -42,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 160,
            translateY: -45,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
        //tooltip={function(e){return e.id+": "+e.formattedValue+" in "+e.indexValue}}
      />
    </BarGraphContainer>
  );
};

export default BarGraph;

const BarGraphContainer = styled.div`
  width: 700px;
  height: 449px;
  padding: 25px;
  padding-right: 15px;
  border-radius: 10px;
  margin: auto;
`;
// const colorBy = ({id})=>(id=== "openColor"? "#6BBB7C":"#F96157")
const theme = {
  textColor: "#FFF",

  tooltip: {
    container: {
      background: "#333",
      fontSize: "13px",
      padding: "5px",
    },
  },
};
