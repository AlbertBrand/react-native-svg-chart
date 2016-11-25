// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import LineChartContainer from './LineChartContainer';

const style = StyleSheet.create({
  chart: {
    height: 300,
  },
});

export default class App extends Component {
  render() {
    const chartProps = {
      data: [
        [0, 10],
        [1, 20],
        [2, 40],
        [3, 23],
        [4, 67],
        [5, 1],
        [6, 54],
        [7, 96],
        [8, 233],
        [9, 67],
        [10, 1],
        [11, 524],
        [12, 96],
        [13, 223],
        [14, 443],
      ],
      options: {
        dashLineColor: '#d0d0d0',
        dataLineColor: '#0000ff',
        textStyle: {
          color: '#000000',
          fontFamily: 'arial',
          fontSize: 12,
        },
        xAccessor: val => val[0],
        yAccessor: val => val[1],
        xLabel: x => String(x),
        yLabel: y => String(y),
      },
    };
    return (
      <View>
        <LineChartContainer {...chartProps} style={style.chart} />
      </View>
    );
  }
}

