import {ScrollView, Text, View} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
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
import _ from 'lodash';
import {SliderMood} from "../../Components/UI/SliderMood";
import {Button, Input, Overlay} from "react-native-elements";
import {updateTags} from "../../store/actions/appActions";
import {OverlayInput} from "../../Components/UI/OverlayInput";
import {TableMood} from "../../Components/UI/TableMood";

export const Chart = () => {
  const [overlay, setOverlay] = useState(false)

  const dataMood = [
    {
      id: 1,
      date: new Date(2020, 3, 2),
      mood: 0,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 2,
      date: new Date(2020, 3, 3),
      mood: 3,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 3,
      date: new Date(2020, 3, 4),
      mood: 1,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 4,
      date: new Date(2020, 3, 5),
      mood: 0,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 5,
      date: new Date(2020, 3, 6),
      mood: 2,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 6,
      date: new Date(2020, 3, 7),
      mood: 5,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 7,
      date: new Date(2020, 3, 8),
      mood: 1,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 8,
      date: new Date(2020, 3, 9),
      mood: 10,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 9,
      date: new Date(2020, 3, 10),
      mood: 2,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 10,
      date: new Date(2020, 3, 11),
      mood: 8,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
    {
      id: 11,
      date: new Date(2020, 3, 12),
      mood: 5,
      energy: Math.floor(Math.random() * Math.floor(11)),
      anxiety: Math.floor(Math.random() * Math.floor(11)),
      caution: Math.floor(Math.random() * Math.floor(11)),
      memory: Math.floor(Math.random() * Math.floor(11)),
      anger: Math.floor(Math.random() * Math.floor(11)),
      sleep: Math.floor(Math.random() * Math.floor(11))
    },
  ];

  const [state, setState] = useState(
    {zoomDomain: {x: [new Date(2020, 3, 4), new Date(2020, 3, 10)]}}
  )

  const handleZoom = (domain) => {
    setState({zoomDomain: domain});
  }

  //https://formidable.com/open-source/victory/guides/zoom-on-large-datasets/
  const getData = (data) => {

    function subDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    }

    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const zoomedXDomain = state.zoomDomain.x;

    return data.filter(
      (d) => (d.date >= subDays(zoomedXDomain[0], 1) && d.date <= addDays(zoomedXDomain[1], 1)));
  }

  const getEntireDomain = (data) => {
    return {
      // y: [_.minBy(data, d => d.mood).mood, _.maxBy(data, d => d.mood).mood],
      x: [data[0].date, _.last(data).date]
    };
  }

  const [entireDomain, setEntireDomain] = useState(
    getEntireDomain(dataMood)
  )
  //https://formidable.com/open-source/victory/guides/zoom-on-large-datasets/

  const renderLines = () => {
    // useMemo(()=>{
    let lines = []
    for (let i = 0; i < 7; i++) {
      const params = ['mood', 'energy', 'anxiety', 'caution', 'memory', 'anger', 'sleep']
      const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#605F5E', '#794F2E']
      lines.push(
        <VictoryLine
          key={i}
          style={{data: {stroke: colors[i], strokeWidth: 2}}}
          data={getData(dataMood)}
          x='date'
          y={params[i]}
        />
      )
    }
    return lines
    // },[dataMood])
  }

  const renderBrushLines = () => {
    // useMemo(()=>{
    let lines = []
    for (let i = 0; i < 7; i++) {
      const params = ['mood', 'energy', 'anxiety', 'caution', 'memory', 'anger', 'sleep']
      const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982c4', '#6A4C93', '#605F5E', '#794F2E']
      lines.push(
        <VictoryLine
          key={i}
          style={{data: {stroke: colors[i], strokeWidth: 2}}}
          data={dataMood}
          x='date'
          y={params[i]}
        />
      )
    }
    return lines
    // },[dataMood])
  }

  const overlayInputHandler = () => {
    setOverlay(false)
  }

  const renderOverlay = () => {
    return useMemo(() => {
      return (
        <Overlay isVisible={overlay}>
          <StyledView>
            <Text h4>Type what you are take</Text>
            <Button
              title={'Submit'}
              onPress={() => {
                overlayInputHandler()
              }}
            />
          </StyledView>
        </Overlay>
      )
    }, [overlay])
  }

// const getDate




  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >

        {renderOverlay()}

        <StyledView style={{padding: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Svg>
            <VictoryChart
              width={450} height={400} scale={{x: "time"}}
              theme={VictoryTheme.material}
              domain={entireDomain}
              padding={{top: 20, bottom: 50, right: 40, left: 50}}
              containerComponent={
                <VictoryZoomContainer
                  // disableContainerEvents
                  zoomDimension="x"
                  zoomDomain={state.zoomDomain}
                  onZoomDomainChange={(domain) => handleZoom(domain)}
                />
              }
            >

              {renderLines()}

              <VictoryAxis
                tickFormat={(data) => ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth()+1)).slice(-2)}
                // gridComponent={
                //   <LineSegment
                //     events={{ onPressIn: (evt) => console.log(evt) }}
                //     style={{color:'red', strokeWidth: 5}}
                //   />}
                // tickCount={3}
                tickLabelComponent={
                  <VictoryLabel
                    dy={0}
                    angle={0}
                    data={getData(dataMood)}
                    style={{color: "cyan", stroke: 'black', strokeWidth: '10px', strokeOpacity: '0.05'}}
                    events={{
                      onPressIn: (evt) => console.log(evt)
                    }}
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
              tickFormat={(data) => ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth()+1)).slice(-2)}
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

            {renderBrushLines()}
          </VictoryChart>
        </StyledView>

        <View style={{position: "absolute", marginLeft: '87%', marginTop: 20, marginRight: 10}}>
          <Button
            type="outline"
            title={'?'}
            onPress={() => {
              setOverlay(true)
            }}
          />
        </View>

        <View>
          <TableMood
          data={dataMood}
          />
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const ChartView = styled(View)`
flex: 1;
justify-content: center;
width: 100%;
background-color: aqua;
`

const StyledView2 = styled(StyledView)`
flex: 1;
`
