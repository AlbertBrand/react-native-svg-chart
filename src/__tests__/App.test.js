// @flow
// eslint-env jest
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('../LineChart', () => 'LineChart');

it('renders correctly', () => {
  renderer.create(
    <App />,
  );
});
