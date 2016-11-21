/* @flow */
import React from 'react';
import {
  G,
  Line,
  Text,
} from 'react-native-svg';
import type {
  NumberScale,
  Label,
  TextStyle,
  TickPoints,
} from './LineChartContainer';

const OFFSET_LEFT = 15;
const OFFSET_TOP = -7;

type Props = {
  textStyle: TextStyle,
  yTickPoints: TickPoints,
  dashLineColor: string,
  yLabel: Label,
  xMin: number,
  xMax: number,
  xScale: NumberScale,
  yScale: NumberScale,
};

export default function YAxis(props: Props) {
  return (
    <G>
      {props.yTickPoints.map((y) => {
        const yScaled = props.yScale(y);
        const label = props.yLabel(y);
        const textProps = {
          ...props.textStyle,
          fill: props.textStyle.color,
          textAnchor: 'start',
          x: props.xScale(props.xMax) + OFFSET_LEFT,
          y: yScaled + OFFSET_TOP,
        };
        const lineProps = {
          stroke: props.dashLineColor,
          strokeDasharray: '3,5',
          strokeWidth: 1,
          x1: props.xScale(props.xMin),
          x2: props.xScale(props.xMax),
          y1: yScaled,
          y2: yScaled,
        };
        return (
          <G key={y}>
            <Text {...textProps}>{label}</Text>
            <Line {...lineProps} />
          </G>
        );
      })}
    </G>
  );
}
