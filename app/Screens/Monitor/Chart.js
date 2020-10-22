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
  console.log('Chart',new Date())
  const [overlay, setOverlay] = useState(false)

  const dateFormat = 'YYYY-MM-DD'

  const data = [
    {
      "id": 1,
      "date": "2020-04-01",
      "mood": 0,
      "energy": 9,
      "anxiety": 2,
      "caution": 7,
      "memory": 4,
      "anger": 4,
      "sleep": 5
    },
    {
      "id": 2,
      "date": "2020-04-02",
      "mood": 3,
      "energy": 3,
      "anxiety": 3,
      "caution": 4,
      "memory": 4,
      "anger": 7,
      "sleep": 10
    },
    {
      "id": 3,
      "date": "2020-04-03",
      "mood": 1,
      "energy": 2,
      "anxiety": 4,
      "caution": 6,
      "memory": 7,
      "anger": 2,
      "sleep": 5
    },
    {
      "id": 4,
      "date": "2020-04-04",
      "mood": 0,
      "energy": 2,
      "anxiety": 3,
      "caution": 8,
      "memory": 0,
      "anger": 8,
      "sleep": 7
    },
    {
      "id": 5,
      "date": "2020-04-05",
      "mood": 2,
      "energy": 1,
      "anxiety": 1,
      "caution": 1,
      "memory": 0,
      "anger": 1,
      "sleep": 7
    },
    {
      "id": 6,
      "date": "2020-04-06",
      "mood": 5,
      "energy": 1,
      "anxiety": 3,
      "caution": 3,
      "memory": 3,
      "anger": 1,
      "sleep": 4
    },
    {
      "id": 7,
      "date": "2020-04-07",
      "mood": 1,
      "energy": 6,
      "anxiety": 1,
      "caution": 1,
      "memory": 4,
      "anger": 5,
      "sleep": 5
    },
    {
      "id": 8,
      "date": "2020-04-08",
      "mood": 10,
      "energy": 8,
      "anxiety": 6,
      "caution": 9,
      "memory": 1,
      "anger": 3,
      "sleep": 7
    },
    {
      "id": 9,
      "date": "2020-04-09",
      "mood": 2,
      "energy": 10,
      "anxiety": 6,
      "caution": 9,
      "memory": 8,
      "anger": 2,
      "sleep": 1
    },
    {
      "id": 10,
      "date": "2020-04-10",
      "mood": 8,
      "energy": 5,
      "anxiety": 7,
      "caution": 2,
      "memory": 0,
      "anger": 7,
      "sleep": 5
    },
    {
      "id": 11,
      "date": "2020-04-11",
      "mood": 5,
      "energy": 1,
      "anxiety": 8,
      "caution": 5,
      "memory": 9,
      "anger": 7,
      "sleep": 3
    }
  ];

  const dataMood = useMemo(() =>
    data.map((e,i) => {return {...e, date: moment(e.date, dateFormat)}})
  ,[data])

  // useEffect(() => {
  //   setDataMood(data.map((e,i) => {
  //     return {...e, date: moment(e.date, dateFormat)}
  //   }))
  //
  //   console.log('useEffect dataMood')
  // }, [data])


  const [state, setState] = useState(
    {zoomDomain: {x: [moment(new Date(2020, 3, 1)), moment(new Date(2020, 3, 11))]}}
  )

  const handleZoom = (domain) => {
    console.log('handleZoom',new Date())
    setState({zoomDomain: domain});
  }

  //https://formidable.com/open-source/victory/guides/zoom-on-large-datasets/
  const getData = (data) => {
    console.log('getData',new Date())
    return data.filter(
      (d) => (
        moment(d.date, dateFormat) >= moment(state.zoomDomain.x[0], dateFormat).subtract(1,'d') &&
        moment(d.date, dateFormat) <= moment(state.zoomDomain.x[1], dateFormat).add(1,'d')
      ));
  }

  const getEntireDomain = (data) => {
    // console.log('getEntireDomain: ', {x: [moment(data[0].date, dateFormat), moment(data[data.length - 1].date, dateFormat)]})
    return {
      // y: [_.minBy(data, d => d.mood).mood, _.maxBy(data, d => d.mood).mood],
      x: [moment(data[0].date, dateFormat), moment(data[data.length-1].date, dateFormat)]
    };
  }

  // const [entireDomain, setEntireDomain] = useState(getEntireDomain(dataMood))

  const renderLines = () => {
    console.log('renderLines',new Date())
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
    console.log('renderBrushLines',new Date())
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >

        {renderOverlay()}

        {dataMood && dataMood[0] ?
        <StyledView style={{padding: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Svg>
            {/*Основной график*/}
            <VictoryChart
              width={450} height={400} scale={{x: "linear"}}
              theme={VictoryTheme.material}
              domain={state.zoomDomain}
              padding={{top: 20, bottom: 50, right: 40, left: 50}}
            >

              {renderLines()}

              {/*Оси*/}
              <VictoryAxis
                tickFormat={(data) => (moment(data).format('MM/DD'))}
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

          {/*Общий уменьшенный график*/}
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={450} height={100} scale={{x: "time"}}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={state.zoomDomain}
                onBrushDomainChange={(domain) => handleZoom(domain)}
              />
            }>

            <VictoryAxis
              tickFormat={(data) => (moment(data, dateFormat).format('MM/DD'))}
              // tickValues={dataMood.map((p) => {
              //   return p.date
              // })}
              // tickFormat={(x) => new Date(x).getDate()}
              // domain={{x: [new Date(2020, 0, 2), Date.now()]}}
              domainPadding={{x: 50}}
              fixLabelOverlap={true}
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
      : <View><Text>asdasd</Text></View>}

        <View style={{position: "absolute", marginLeft: '87%', marginTop: 20, marginRight: 10}}>
          <Button
            type="outline"
            title={'?'}
            onPress={() => {
              setOverlay(true)
            }}
          />
        </View>

        {/*<View>*/}
        {/*  <TableMood*/}
        {/*  data={dataMood}*/}
        {/*  />*/}
        {/*</View>*/}

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
