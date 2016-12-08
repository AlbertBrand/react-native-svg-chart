// @flow
// eslint-env jest
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import LineChartContainer from '../LineChartContainer';

jest.mock('../LineChart', () => 'LineChart');

describe('LineChartContainer', () => {
  const xAccessor = value => value.x;
  const yAccessor = value => value.y * 2;
  const xLabel = value => String(value);
  const yLabel = value => String(value);
  const data = [
    { x: 1, y: 2.4 },
    { x: 2, y: 4.9 },
    { x: 4, y: 3.1 },
  ];
  const options = {
    width: 300,
    height: 200,
    dashLineColor: 'gray',
    dataLineColor: 'blue',
    textStyle: {
      color: 'black',
      fontFamily: 'arial',
      fontSize: 10,
    },
    xAccessor,
    yAccessor,
    xLabel,
    yLabel,
  };

  it('renders empty view', () => {
    const tree = renderer.create(
      <LineChartContainer data={data} options={options} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders chart', () => {
    const chartRenderer = renderer.create(
      <LineChartContainer data={data} options={options} />,
    );
    let tree = chartRenderer.toJSON();
    tree.props.onLayout({ nativeEvent: { layout: { width: 300, height: 200 } } });
    tree = chartRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
