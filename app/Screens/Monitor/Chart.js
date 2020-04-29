import {Text, View} from "react-native";
import React, {useState} from "react";
import {Container, StyledView} from "../../theme";
import styled from "styled-components";
import {
  Curve, LineSegment,
  VictoryAxis,
  VictoryBar,
  VictoryBrushContainer,
  VictoryChart, VictoryLabel,
  VictoryLine,
  VictoryTheme, VictoryTooltip, VictoryVoronoiContainer,
  VictoryZoomContainer
} from "victory-native";
import {SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";
import Svg from "react-native-svg";

export const Chart = () => {

  const dataMood = [
    {
      id: 1,
      date: new Date(2020, 3, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 3, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 3, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 3, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 3, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 3, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 3, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 3, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 3, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 3, 11),
      score: 8,
    },
  ];

  const dataAnxiety = [
    {
      id: 1,
      date: new Date(2020, 0, 2, 17),
      score: 1,
    },
    {
      id: 2,
      date: new Date(2020, 0, 3, 17),
      score: 5,
    },
    {
      id: 3,
      date: new Date(2020, 0, 4, 17),
      score: 6,
    },
  ];

  const [state, setState] = useState(
    {
      zoomDomain: {x: [new Date(2020, 3, 1), Date.now()]}
    }
  )

  const handleZoom = (domain) => {
    setState({zoomDomain: domain});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StyledView>

        <StyledView>
          <Svg>
            <VictoryChart width={450} height={400} scale={{x: "time"}}
                          theme={VictoryTheme.material}
                          containerComponent={ <VictoryVoronoiContainer
                              voronoiDimension="x"
                              labels={({datum}) => `y: ${datum.score}`}
                              labelComponent={<VictoryTooltip cornerRadius={15}
                                                              flyoutStyle={{fill: "white"}}/>}
                              events={{
                                onPressOut: (evt) => console.log('123123')
                              }}
                            /> }
            >
              <VictoryLine
                style={{data: {stroke: "tomato", strokeWidth: 4}, labels: {fill: "tomato"}}}
                data={dataMood}
                x="date"
                y="score"
                animate={{
                  duration: 1000,
                  onLoad: {duration: 1000}
                }}
                // dataComponent={<Curve events={{
                //   onPressIn: (evt) => console.log('VictoryLine')
                // }}/>}
              />

              {/*<VictoryAxis*/}
              {/*  axisComponent={<LineSegment*/}
              {/*    style={{*/}
              {/*    stroke: 'red',*/}
              {/*    strokeWidth: 10,*/}
              {/*  }}*/}
              {/*    events={{*/}
              {/*      target: 'tickLabels',*/}
              {/*      onPressIn: (evt) => console.log('VictoryAxis') }}/>}*/}
              {/*  style={{ tickLabels: { fill: "cyan" } }}*/}
              {/*/>*/}
              {/*<VictoryAxis dependentAxis*/}
              {/*             axisComponent={<LineSegment*/}
              {/*               style={{*/}
              {/*                 stroke: 'black',*/}
              {/*                 strokeWidth: 10*/}
              {/*               }}*/}
              {/*               events={{ onPressIn: (evt) => console.log('evt') }}/>}*/}
              {/*/>*/}

            </VictoryChart>
          </Svg>
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={450} height={100} scale={{x: "time"}}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={state.zoomDomain}
                // onBrushDomainChange={(domain,props)=>handleZoom(domain)}
                onBrushDomainChangeEnd={(domain) => handleZoom(domain)}
              />
            }
          >
            <VictoryAxis
              tickValues={dataMood.map((p) => {
                return p.date
              })}
              tickFormat={(x) => new Date(x).getDate()}
            />
            <VictoryLine
              style={{data: {stroke: "tomato"}}}
              data={dataMood}
              x="date"
              y="score"
            />
          </VictoryChart>
        </StyledView>

        <View style={{flex: 0.3}}>
          <Text>asdasdasd</Text>
        </View>

      </StyledView>
    </SafeAreaView>
  )
}

const StyledView1 = styled(StyledView)`
flex: 1;
`

const StyledView2 = styled(StyledView)`
flex: 1;
`
