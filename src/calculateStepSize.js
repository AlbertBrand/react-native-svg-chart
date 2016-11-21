/* @flow */
/*
 * Calculate size of steps according to a range and
 * a minimum number of steps. Returned size is a
 * magnitude of 1, 2 or 5.
 *
 * @see http://stackoverflow.com/a/1525198/526233
 */
export default function calculateStepSize(range: number, minSteps: number) {
  // calculate an initial guess at step size
  const tempStep = range / minSteps;

  // get the magnitude of the step size
  const mag = Math.floor(Math.log(tempStep) / Math.log(10));
  const magPow = 10 ** mag;

  // calculate most significant digit of the new step size
  let magMsd = Math.floor(tempStep / magPow);

  // promote the MSD to either 1, 2, or 5
  if (magMsd > 5) {
    magMsd = 10;
  } else if (magMsd > 2) {
    magMsd = 5;
  } else if (magMsd > 1) {
    magMsd = 2;
  }
  return magMsd * magPow;
}

