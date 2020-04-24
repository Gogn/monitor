import React from 'react'
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {G, Rect, Line, Circle} from 'react-native-svg'
import {StyledView} from "../../theme";
import {View, Text} from "react-native";
import styled from "styled-components/native";
import {SafeAreaConsumer, SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";
import * as scale from 'd3-scale'

export const Chart = () => {

  const datad = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const dataMood = [
    {
      id: 1,
      date: new Date(2018, 0, 2, 17),
      score: 0,
    },
    {
      id: 2,
      date: new Date(2018, 0, 3, 17),
      score: 3,
    },
    {
      id: 3,
      date: new Date(2018, 0, 4, 17),
      score: 1,
    },
    {
      id: 4,
      date: new Date(2018, 0, 5, 17),
      score: 0,
    },
    {
      id: 5,
      date: new Date(2018, 0, 6, 17),
      score: 2,
    },
    {
      id: 6,
      date: new Date(2018, 0, 7, 17),
      score: 5,
    },
    {
      id: 7,
      date: new Date(2018, 0, 8, 17),
      score: 1,
    },
    {
      id: 8,
      date: new Date(2018, 0, 9, 17),
      score: 10,
    },
    {
      id: 9,
      date: new Date(2018, 0, 10, 17),
      score: 2,
    },
    {
      id: 10,
      date: new Date(2018, 0, 11, 17),
      score: 8,
    },
  ];

  const dataAnxiety = [
    {
      id: 1,
      date: new Date(2018, 0, 2, 17),
      score: 1,
    },
    {
      id: 2,
      date: new Date(2018, 0, 3, 17),
      score: 5,
    },
    {
      id: 3,
      date: new Date(2018, 0, 4, 17),
      score: 6,
    },
  ];

  const data = [
    {
      data: dataMood,
      svg: {stroke: 'purple'},
    },
    {
      data: dataAnxiety,
      svg: {stroke: 'green'},
    },
  ]

  const Tooltip = ({x, y}) => (
    <G
      x={x(5) - (75 / 2)}
      key={'tooltip'}
      onPress={() => console.log('tooltip clicked')}
    >
      <G y={50}>
        <Rect
          height={40}
          width={75}
          stroke={'grey'}
          fill={'white'}
          ry={10}
          rx={10}
        />

      </G>
      <G x={75 / 2}>
        <Line
          y1={5}
          y2={7}
          stroke={'grey'}
          strokeWidth={2}
        />
        {/*<Circle*/}
        {/*  cy={y(data[5])}*/}
        {/*  r={6}*/}
        {/*  stroke={'rgb(134, 65, 244)'}*/}
        {/*  strokeWidth={2}*/}
        {/*  fill={'white'}*/}
        {/*/>*/}
      </G>
    </G>
  )

  const CustomGrid = ({x, y, data, ticks}) => {
    // console.log(data)

    const xValues = data[0].data.map((item, index) => item.date)
    const xTicks = scale.scaleTime()
      .domain(xValues)
      .ticks(10)
    console.log(xTicks)
    return (
      <G>
        {
          // Horizontal grid
          ticks.map(tick => (
            <Line
              key={tick}
              x1={'0%'}
              x2={'100%'}
              y1={y(tick)}
              y2={y(tick)}
              stroke={'rgba(0,0,0,0.2)'}
            />
          ))
        }
        {
          // Vertical grid
          data[0].data.map((value, tick) => {
            console.log('x', x(value))
            return (
              <Line
                key={tick}
                y1={'0%'}
                y2={'100%'}
                x1={x(value.date)}
                x2={x(value.date)}
                stroke={'rgba(0,0,0,0.2)'}
              />
            )
          })
        }
      </G>
    )
  }

  const verticalContentInset = {top: 10, bottom: 10}
  const xAxisHeight = 40

  return (
    <SafeAreaView>
      <Box>
        <ChartContainer>

          <YAxis
            data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            style={{marginRight: 10}}
            contentInset={{top: 10, bottom: 10}}
            svg={{fontSize: 10, fill: 'black', fontWeight: 'bold',}}
            // numberOfTicks={10}
          />
          <LineChart
            style={{flex: 1}}
            data={data}
            contentInset={{top: 10, bottom: 10, left: 10, right: 10}}
            yAccessor={({item}) => item.score}
            xAccessor={({item}) => item.date}
            numberOfTicks={10}
            xScale={scale.scaleTime}
            svg={{
              stroke: 'rgb(134, 65, 244)',
              strokeWidth: 2,
            }}
            // xMin={10}
          >
            <CustomGrid/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              {/*<Tooltip/>*/}
              <View style={{width: '100%', alignSelf: 'flex-end'}}>
                <XAxis
                  // style={{marginHorizontal: -10, height: xAxisHeight}}
                  data={dataMood}
                  xAccessor={({item}) => item.date}
                  formatLabel={value => moment(value).format("DD-MM-YYYY")}
                  // contentInset={{left: 30, right: 30}}
                  scale={scale.scaleTime}
                  numberOfTicks={5}
                  svg={{
                    fontSize: 10,
                    fill: 'black',
                    fontWeight: 'bold',
                    rotation: 0,
                    originY: 0,
                    y: 0
                  }}
                />
              </View>
            </View>
          </LineChart>

        </ChartContainer>


        <Container>
          <Text>asdasdasd</Text>
        </Container>

      </Box>
    </SafeAreaView>
  )
}


const Box = styled.View`
height: 100%;
width: 100%;
margin-top: 15px;
align-items: center;
justify-content: center;
`

const ChartContainer = styled.View`
width: 90%;
flex-direction: row;
align-items: center;
justify-content: center;
flex: 0.5;
`

const Container = styled.View`
width: 90%;
flex-direction: row;
align-items: center;
justify-content: center;
flex: 1;
`

