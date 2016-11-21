/* @flow */
import React from 'react';
import {
  G,
  Text,
} from 'react-native-svg';
import type {
  Points,
  NumberScale,
  Label,
  TextStyle,
} from './LineChartContainer';

const OFFSET_TOP = 20;

type Props = {
  textStyle: TextStyle,
  chartPoints: Points,
  xScale: NumberScale,
  yScale: NumberScale,
  xLabel: Label,
  yMin: number,
};

export default function XAxis(props: Props) {
  return (
    <G>
      {props.chartPoints.map((point, idx) => {
        const textProps = {
          ...props.textStyle,
          fill: props.textStyle.color,
          textAnchor: 'middle',
          x: props.xScale(point[0]),
          y: props.yScale(props.yMin) + OFFSET_TOP,
        };
        const label = props.xLabel(point[0], point[2]);
        return (
          <Text {...textProps} key={idx}>{label}</Text>
        );
      })}
    </G>
  );
}
