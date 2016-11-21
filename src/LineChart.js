/* @flow */
import React from 'react';
import Svg, { G } from 'react-native-svg';
import XAxis from './XAxis';
import YAxis from './YAxis';
import LinePath from './LinePath';

import type {
  Points,
  PointScale,
  NumberScale,
  Label,
  TextStyle,
  TickPoints,
} from './LineChartContainer';

type Props = {
  chartPoints: Points,
  yTickPoints: TickPoints,
  scale: PointScale,
  width: number,
  height: number,
  dataLineColor: string,
  dashLineColor: string,
  textStyle: TextStyle,

  xLabel: Label,
  xMin: number,
  xMax: number,
  xOffset: number,
  xScale: NumberScale,

  yLabel: Label,
  yMin: number,
  yOffset: number,
  yScale: NumberScale,
};

export default function LineChart(props: Props) {
  return (
    <Svg width={props.width} height={props.height}>
      <G x={props.xOffset} y={props.yOffset}>
        <XAxis
          chartPoints={props.chartPoints}
          textStyle={props.textStyle}
          xLabel={props.xLabel}
          xScale={props.xScale}
          yMin={props.yMin}
          yScale={props.yScale}
        />
        <YAxis
          dashLineColor={props.dashLineColor}
          textStyle={props.textStyle}
          xMax={props.xMax}
          xMin={props.xMin}
          xScale={props.xScale}
          yLabel={props.yLabel}
          yScale={props.yScale}
          yTickPoints={props.yTickPoints}
        />
        <LinePath
          chartPoints={props.chartPoints}
          scale={props.scale}
          dataLineColor={props.dataLineColor}
        />
      </G>
    </Svg>
  );
}
