// @flow
import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import {
  ClipPath,
  Circle,
  Defs,
  G,
  Path,
  Rect,
} from 'react-native-svg';
import Polygon from 'paths-js/polygon';

import type { Points, PointScale } from './LineChartContainer';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function interpolateToString(animatedValue: Animated.Value) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '1'],
  });
}

type Props = {
  chartPoints: Points,
  scale: PointScale,
  dataLineColor: string,
};

export default class LinePath extends React.Component {
  props: Props;
  state: {
    clipWidth: Animated.Value,
    pointRadius: Animated.Value,
  } = {
    clipWidth: new Animated.Value(0),
    pointRadius: new Animated.Value(0),
  }

  componentDidMount() {
    const chartPoints = this.props.chartPoints;
    const lastScaledPoint = this.props.scale(chartPoints[chartPoints.length - 1]);
    Animated.sequence([
      Animated.timing(
        this.state.clipWidth, {
          toValue: lastScaledPoint[0],
          duration: 1500,
          easing: Easing.linear,
        },
      ),
      Animated.timing(
        this.state.pointRadius, {
          toValue: 4,
          duration: 200,
        },
      ),
    ]).start();
  }

  render() {
    const scaledPoints = this.props.chartPoints.map(this.props.scale);
    const polygon = Polygon({
      points: scaledPoints,
      closed: false,
    }).path.print();
    const lastPoint = scaledPoints[scaledPoints.length - 1];
    return (
      <G>
        <Defs>
          <ClipPath id="clip">
            <AnimatedRect
              x="0"
              y="0"
              width={interpolateToString(this.state.clipWidth)}
              height="300"
            />
          </ClipPath>
        </Defs>
        <Path
          d={polygon}
          fill="none"
          stroke={this.props.dataLineColor}
          strokeWidth="2"
          x={0}
          y={0}
          clipPath="url(#clip)"
        />
        <AnimatedCircle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r={interpolateToString(this.state.pointRadius)}
          fill={this.props.dataLineColor}
        />
      </G>
    );
  }
}
