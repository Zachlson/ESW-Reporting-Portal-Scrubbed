import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components'
const PieGraph = ({pieData}) => {

    return(
        <PieContainer>
            <MyResponsivePie data={pieData}/>
        </PieContainer>
    )
}

export default PieGraph
const PieContainer = styled.div`
    height: 110%;
` 
const MyResponsivePie = ({data}) => (
    <ResponsivePie

    theme={{
        tooltip: {
          container: {
            background: "#333",
            color: "#ffff",
            padding: "10px 20px",
            fontSize: "13px",
            textTransform: "capitalize"
          }
        },
        legends: {
            text:{              
              fontFamily: 'lato',
              fontSize: 14            
            }           
        }
    }}
        data={data}
        margin={{ top: -180, right: 20, bottom: 160, left: 20 }} //This sets the size of the graph itself.
        innerRadius={0.75}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}      
        colors={{scheme: 'set1'}} //Nivo has several palettes to pick from or change it to colors={{datum: data.color}} for user defined colors.
        sortByValue={true}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff" //Labels on the sides of the pie graph
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="{{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}"
        //  isInteractive={false}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: -75, //Left and Right
                translateY: 30, //Up and Down
                itemsSpacing: 6,
                itemWidth: 100,
                itemHeight: 10,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#ffffff'
                        }
                    }
                ],
            }
        ]}
    />
)