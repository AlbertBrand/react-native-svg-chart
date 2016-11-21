// @flow
// eslint-env jest
import calculateStepSize from '../calculateStepSize';

describe('components/instrument-detail/chart/util', () => {
  describe('calculateStepSize', () => {
    it('returns correct step size for inputs', () => {
      expect(calculateStepSize(1, 10)).toEqual(0.1);
      expect(calculateStepSize(1, 9)).toEqual(0.1);
      expect(calculateStepSize(1, 6)).toEqual(0.1);
      expect(calculateStepSize(1, 5)).toEqual(0.2);
      expect(calculateStepSize(1, 2)).toEqual(0.5);
      expect(calculateStepSize(1, 1)).toEqual(1);

      expect(calculateStepSize(10, 10)).toEqual(1);
      expect(calculateStepSize(10, 5)).toEqual(2);
      expect(calculateStepSize(10, 1)).toEqual(10);

      expect(calculateStepSize(50, 5)).toEqual(10);
      expect(calculateStepSize(50, 3)).toEqual(10);
      expect(calculateStepSize(50, 2)).toEqual(20);
    });
  });
});
