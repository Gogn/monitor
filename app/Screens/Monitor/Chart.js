import React from 'react'
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Line from 'react-native-svg'
import {G, Rect, Circle} from 'react-native-svg'
import {StyledView} from "../../theme";
import {View, Text} from "react-native";
import styled from "styled-components/native";
import {SafeAreaConsumer, SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";

export const Chart = () => {

  const dataa = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const data = [
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

  ];

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

  const verticalContentInset = {top: 10, bottom: 10}
  const xAxisHeight = 40

  const datab = [0, 1, 2, 3]

  return (
    <SafeAreaView>
      <Box>


        <ChartContainer>

          <YAxis
            data={datab}
            style={{marginBottom: xAxisHeight, marginRight: 10}}
            contentInset={verticalContentInset}
            svg={{fontSize: 10, fill: 'black', fontWeight: 'bold',}}
            numberOfTicks={3}
          />
          <LineChart
            style={{flex: 1}}
            data={data}
            contentInset={verticalContentInset}
            yAccessor={({item}) => item.score}
            xAccessor={({item}) => moment(item.date)}
            numberOfTicks={3}
            svg={{
              stroke: 'rgb(134, 65, 244)',
              strokeWidth: 2,
            }}
            // xMin={10}
          >
            <Grid/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              {/*<Tooltip/>*/}
              <View style={{width: '90%', alignSelf: 'flex-end'}}>
                <XAxis
                  style={{marginHorizontal: -10, height: xAxisHeight}}
                  data={data}
                  xAccessor={({item}) => item.date}
                  formatLabel={value => moment(value).format("DD-MM-YYYY")}
                  contentInset={{left: 30, right: 30}}
                  svg={{
                    fontSize: 10,
                    fill: 'black',
                    fontWeight: 'bold',
                    rotation: 20,
                    originY: 15,
                    y: 15
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

