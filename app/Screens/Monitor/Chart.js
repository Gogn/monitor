import {Text, View} from "react-native";
import React, {useState} from "react";
import {Container, StyledView} from "../../theme";
import styled from "styled-components";
import {
  VictoryAxis,
  VictoryBar,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer
} from "victory-native";

export const Chart = () => {
  const [state, setState] = useState(
    {
      zoomDomain: { x: [new Date(2008, 1, 1),new Date(2008, 8, 1)] }
    }
  )

  const handleZoom = (domain) => {
    setState({ zoomDomain: domain });
  }

  return (
    <StyledView>

      <StyledView>
        <VictoryChart width={450} height={470} scale={{x: "time"}}
                      containerComponent={
                        <VictoryZoomContainer
                          zoomDimension="x"
                          zoomDomain={state.zoomDomain}
                          onZoomDomainChange={(domain)=>handleZoom(domain)}
                        />
                      }
        >
          <VictoryLine
            style={{
              data: {stroke: "tomato"}
            }}
            data={[
              {a: new Date(2008, 1, 1), b: 125},
              {a: new Date(2008, 2, 1), b: 257},
              {a: new Date(2008, 3, 1), b: 345},
              {a: new Date(2008, 4, 1), b: 515},
              {a: new Date(2008, 5, 1), b: 132},
              {a: new Date(2008, 6, 1), b: 305},
              {a: new Date(2008, 7, 1), b: 270},
              {a: new Date(2008, 8, 1), b: 470}
            ]}
            x="a"
            y="b"
          />

        </VictoryChart>
        <VictoryChart
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          width={450} height={100} scale={{x: "time"}}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={state.zoomDomain}
              onBrushDomainChange={(domain,props)=>handleZoom(domain)}
              // onBrushDomainChangeEnd={(domain)=>handleZoom(domain)}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).getMonth()}
          />
          <VictoryLine
            style={{
              data: {stroke: "tomato"}
            }}
            data={[
              {key: new Date(2008, 1, 1), b: 125},
              {key: new Date(2008, 2, 1), b: 257},
              {key: new Date(2008, 3, 1), b: 345},
              {key: new Date(2008, 4, 1), b: 515},
              {key: new Date(2008, 5, 1), b: 132},
              {key: new Date(2008, 6, 1), b: 305},
              {key: new Date(2008, 7, 1), b: 270},
              {key: new Date(2008, 8, 1), b: 470}
            ]}
            x="key"
            y="b"
          />
        </VictoryChart>
      </StyledView>

      <View style={{flex: 0.3}}>
        <Text>asdasdasd</Text>
      </View>

    </StyledView>
  )
}

const StyledView1 = styled(StyledView)`
flex: 1;
`

const StyledView2 = styled(StyledView)`
flex: 1;
`
