/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Collisions Service
 *               A service to detect different collisions.
 * @version      1.0
 * @license      Digitsensitive
 */

export function PointLineCollision(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  px: number,
  py: number
): boolean {
  // Get distances from the point to the two ends of the line
  let d1 = Phaser.Math.Distance.Between(px, py, x1, y1);
  let d2 = Phaser.Math.Distance.Between(px, py, x2, y2);

  // Get the length of the line
  let lineLen = Phaser.Math.Distance.Between(x1, y1, x2, y2);

  // Add a buffer zone (if higher, than less accurate)
  let buffer = 0.1;

  // If the two distances are equal to the line's length,
  // the point is on the line!
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}
