// @flow
// eslint-env jest
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Index from '../index.ios';

it('renders correctly', () => {
  renderer.create(
    <Index />,
  );
});
