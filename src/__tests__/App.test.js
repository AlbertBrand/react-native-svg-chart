// @flow
// eslint-env jest
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';

jest.mock('../LineChart', () => 'LineChart');

it('renders correctly', () => {
  renderer.create(
    <App />,
  );
});
