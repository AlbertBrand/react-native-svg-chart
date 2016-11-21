/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { minBy, maxBy } from 'paths-js/ops';
import linear from 'paths-js/linear';
import LineChart from './LineChart';
import calculateStepSize from './calculateStepSize';

export type TickPoints = Array<number>;
export type Point = [number, number, any];
export type Points = Array<Point>;
export type PointScale = (point: Point) => Point;
export type NumberScale = (value: number) => number;
export type Label = (value: number, origValue: any) => string;
export type Data = Array<any>;
export type TextStyle = {
  color: string,
  fontFamily: string,
  fontSize: number,
};
export type Accessor = (value: any, idx: number) => number;
type Event = {
  nativeEvent: {
    layout: {
      width:number,
      height: number
    }
  }
};
type Props = {
  data: Data,
  options: {
    dashLineColor: string,
    dataLineColor: string,
    textStyle: TextStyle,
    xAccessor: Accessor,
    yAccessor: Accessor,
    xLabel: Label,
    yLabel: Label,
  },
  style?: any
};

const MARGIN_TOP = 10;
const MARGIN_RIGHT = 50;
const MARGIN_BOTTOM = 40;
const MARGIN_LEFT = 20;

const MIN_TICK_COUNT = 5;

export default class LineChartContainer extends Component {
  state: {
    layout?: {
      width: number,
      height: number,
    }
  } = {};
  props: Props;
  handle: number;

  renderChart(width: number, height: number) {
    // calculate plot size (area of chart without axes)
    const plotWidth = width - MARGIN_LEFT - MARGIN_RIGHT;
    const plotHeight = height - MARGIN_TOP - MARGIN_BOTTOM;

    // access provided data and transform into chart data
    const {
      xAccessor,
      yAccessor,
    } = this.props.options;
    const transform = (data, idx) => [xAccessor(data, idx), yAccessor(data, idx), data];
    const chartPoints = this.props.data.map(transform);

    // determine min and max
    const xMin = minBy(chartPoints, point => point[0]);
    const xMax = maxBy(chartPoints, point => point[0]);
    const yMin = minBy(chartPoints, point => point[1]);
    const yMax = maxBy(chartPoints, point => point[1]);

    // calculate placement of ticks on y-axis
    const yTickStep = calculateStepSize(yMax - yMin, MIN_TICK_COUNT);
    const yTickMin = Math.floor(yMin / yTickStep) * yTickStep;
    const yTickMax = Math.ceil(yMax / yTickStep) * yTickStep;
    const yTickPoints:TickPoints = [];
    for (let i = yTickMin; i < yTickMax + yTickStep; i += yTickStep) {
      yTickPoints.push(i);
    }

    // create scaling functions for plot width and height
    const xScale = linear([xMin, xMax], [0, plotWidth]);
    const yScale = linear([yTickMin, yTickMax], [plotHeight, 0]);
    const scale = ([x, y]) => [xScale(x), yScale(y)];

    const chartProps = {
      ...this.props.options,
      width,
      height,
      chartPoints,
      yTickPoints,
      xMin,
      xMax,
      xScale,
      xOffset: MARGIN_LEFT,
      yMin: yTickMin,
      yMax: yTickMax,
      yOffset: MARGIN_TOP,
      yScale,
      scale,
    };

    return (
      <LineChart {...chartProps} />
    );
  }

  render() {
    return (
      <View
        onLayout={(e:Event) => this.setState(e.nativeEvent)}
        style={this.props.style}
      >
        {this.state.layout ?
          this.renderChart(this.state.layout.width, this.state.layout.height) : null}
      </View>
    );
  }
}
