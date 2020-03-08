/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Point-Line-Collision Service
 *               A service to detect a point to line collision
 * @version      1.0
 * @license      Digitsensitive
 */

export abstract class PointLineCollisionService {
  static isColliding(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    px: number,
    py: number
  ): boolean {
    // get distance from the point to the two ends of the line
    let d1 = Phaser.Math.Distance.Between(px, py, x1, y1);
    let d2 = Phaser.Math.Distance.Between(px, py, x2, y2);

    // get the length of the line
    let lineLen = Phaser.Math.Distance.Between(x1, y1, x2, y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.1; // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
      return true;
    }
    return false;
  }
}
