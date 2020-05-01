import {Text, View} from "react-native";
import React, {useState} from "react";
import {Container, StyledView} from "../../theme";
import styled from "styled-components";
import {
  createContainer,
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
  const dataMood2 = [
    {
      id: 1,
      date: new Date(2020, 1, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 5, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 7, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 8, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 1, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 5, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 3, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 2, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 1, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 7, 11),
      score: 8,
    },
  ];
  const dataMood3 = [
    {
      id: 1,
      date: new Date(2020, 8, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 9, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 1, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 2, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 3, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 1, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 5, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 7, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 6, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 4, 11),
      score: 8,
    },
  ];
  const dataMood4 = [
    {
      id: 1,
      date: new Date(2020, 4, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 5, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 6, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 5, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 4, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 5, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 6, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 5, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 3, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 4, 11),
      score: 8,
    },
  ];
  const dataMood5 = [
    {
      id: 1,
      date: new Date(2020, 1, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 2, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 3, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 2, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 1, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 2, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 3, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 2, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 1, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 3, 11),
      score: 8,
    },
  ];
  const dataMood6 = [
    {
      id: 1,
      date: new Date(2020, 7, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 8, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 9, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 8, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 7, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 8, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 9, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 3, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 8, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 7, 11),
      score: 8,
    },
  ];
  const dataMood7 = [
    {
      id: 1,
      date: new Date(2020, 7, 2),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2020, 4, 3),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2020, 1, 4),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2020, 2, 5),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2020, 1, 6),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2020, 4, 7),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2020, 7, 8),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2020, 4, 9),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2020, 1, 10),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2020, 4, 11),
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
      zoomDomain: {x: [new Date(2020, 0, 2), Date.now()]}
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
                          containerComponent={
                            <VictoryZoomContainer
                              // disableContainerEvents
                              zoomDimension="x"
                              zoomDomain={state.zoomDomain}
                              onZoomDomainChange={(domain) => handleZoom(domain)}
                            />
                          }

            >

              <VictoryLine
                style={{data: {stroke: "tomato", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "black", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood2}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "blue", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood3}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "cyan", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood4}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "red", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood5}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "yellow", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood6}
                x="date"
                y="score"
              />
              <VictoryLine
                style={{data: {stroke: "green", strokeWidth: 2}, labels: {fill: "tomato"}}}
                data={dataMood7}
                x="date"
                y="score"
              />

              <VictoryAxis
                tickLabelComponent={
                  <VictoryLabel dy={0}
                                style={{color: "cyan", stroke: 'black', strokeWidth: '10px', strokeOpacity: '0.05'}}
                                events={{ target: 'tickLabels',
                                  onPressIn: (evt) => console.log('tickLabelComponent') }}
                  />}
              />
              <VictoryAxis
                dependentAxis
                tickCount={10}
              />

            </VictoryChart>
          </Svg>
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={450} height={100} scale={{x: "time"}}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={state.zoomDomain}
                onBrushDomainChangeEnd={(domain) => handleZoom(domain)}
              />
            }
          >
            <VictoryAxis
              // tickValues={dataMood.map((p) => {
              //   return p.date
              // })}
              // tickFormat={(x) => new Date(x).getDate()}
              // domain={{x: [new Date(2020, 0, 2), Date.now()]}}
              // domainPadding={{x: 50}}
              // fixLabelOverlap={true}
              style={{
                // axis: {stroke: "#756f6a"},
                axisLabel: {fontSize: 20, padding: 30},
                // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
                // ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: 10, padding: 5}
              }}
            />

            <VictoryLine
              style={{data: {stroke: "tomato", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "black", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood2}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "blue", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood3}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "cyan", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood4}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "red", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood5}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "yellow", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood6}
              x="date"
              y="score"
            />
            <VictoryLine
              style={{data: {stroke: "green", strokeWidth: 2}, labels: {fill: "tomato"}}}
              data={dataMood7}
              x="date"
              y="score"
            />
          </VictoryChart>
        </StyledView>

        {/*<View style={{flex: 0.2}}>*/}
        {/*  <Text>asdasdasd</Text>*/}
        {/*</View>*/}

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
