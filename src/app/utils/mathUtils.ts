/**
 * Clamp a value between a minimum and maximum.
 * @param value - The value to clamp.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolate between two values.
 * @param start - The starting value.
 * @param end - The ending value.
 * @param t - The interpolation factor (between 0 and 1).
 * @returns The interpolated value.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + t * (end - start);
}

/**
 * Generate a random number between a minimum and maximum value.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random number between min and max.
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Convert degrees to radians.
 * @param degrees - Angle in degrees.
 * @returns Angle in radians.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees.
 * @param radians - Angle in radians.
 * @returns Angle in degrees.
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Map a value from one range to another.
 * @param value - The value to map.
 * @param inMin - The minimum value of the input range.
 * @param inMax - The maximum value of the input range.
 * @param outMin - The minimum value of the output range.
 * @param outMax - The maximum value of the output range.
 * @returns The mapped value in the output range.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate the distance between two 3D points.
 * @param x1 - X coordinate of the first point.
 * @param y1 - Y coordinate of the first point.
 * @param z1 - Z coordinate of the first point.
 * @param x2 - X coordinate of the second point.
 * @param y2 - Y coordinate of the second point.
 * @param z2 - Z coordinate of the second point.
 * @returns The Euclidean distance between the two points.
 */
export function distance3D(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

/**
 * Normalize a value between 0 and 1.
 * @param value - The value to normalize.
 * @param min - The minimum value in the range.
 * @param max - The maximum value in the range.
 * @returns The normalized value between 0 and 1.
 */
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}
