export class Cell {
  private value: number;
  private position: Phaser.Math.Vector2;
  private valueHasChanged: boolean;

  constructor(x: number, y: number, v: number) {
    this.value = v;
    this.position = new Phaser.Math.Vector2(x, y);
    this.valueHasChanged = false;
  }

  public getValue(): number {
    return this.value;
  }

  public getPosition(): Phaser.Math.Vector2 {
    return this.position;
  }

  public setValue(v: number): void {
    this.value = v;
  }

  public setValueChange(): void {
    this.valueHasChanged = true;
  }

  public changeValue(): boolean {
    return this.valueHasChanged;
  }

  public setValueToFalse(): void {
    this.valueHasChanged = false;
  }
}
