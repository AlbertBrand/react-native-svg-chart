// @flow
import React from 'react';
import { Path } from 'react-native-svg';
import Polygon from 'paths-js/polygon';

import type { Points, PointScale } from './LineChartContainer';

type Props = {
  chartPoints: Points,
  scale: PointScale,
  dataLineColor: string,
};

export default function LinePath(props: Props) {
  const scaledPoints = props.chartPoints.map(props.scale);
  const polygon = Polygon({
    points: scaledPoints,
    closed: false,
  }).path.print();
  return (
    <Path
      d={polygon}
      fill="none"
      stroke={props.dataLineColor}
      strokeWidth="2"
      x={0}
      y={0}
    />
  );
}
