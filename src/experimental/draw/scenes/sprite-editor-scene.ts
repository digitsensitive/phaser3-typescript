/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Draw: Sprite Editor Scene
 *               In this scene you can draw your sprites.
 *               There are three components:
 *               1. The color palette
 *               2. The draw area
 *               3. The sprite sheet
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Sprite } from "../objects/sprite";
import { Point } from "../objects/point";

export class SpriteEditorScene extends Phaser.Scene {
  // COLOR PALETTE VARIABLES
  readonly CURRENT_COLOR_BORDER_SIZE: number = 1; // TODO: will not render correct if changed
  readonly CURRENT_COLOR_STROKE_COLOR: number = 0xffffff;
  readonly CURRENT_COLOR_STROKE_ALPHA: number = 1;
  readonly PALETTE_BORDER_SIZE: number = 1; // TODO: will not render correct if changed
  readonly PALETTE_BORDER_STROKE_COLOR: number = 0xffffff;
  readonly PALETTE_BORDER_STROKE_ALPHA: number = 1;
  readonly PALETTE_CELL_SIZE: number = 10;
  readonly PALETTE_COLOR_COUNT: number = 16;
  readonly PALETTE_COLORS: number[] = [
    0x1a1c2c,
    0x5d275d,
    0xb13e53,
    0xef7d57,
    0xffcd75,
    0xa7f070,
    0x38b764,
    0x257179,
    0x29366f,
    0x3b5dc9,
    0x41a6f6,
    0x73eff7,
    0xf4f4f4,
    0x94b0c2,
    0x566c86,
    0x333c57
  ];
  readonly PALETTE_HEIGHT: number = 8;
  readonly PALETTE_POSITION: number[] = [20, 20];
  readonly PALETTE_WIDTH: number = 2;

  // SPRITE SHEET VARIABLES
  readonly CURRENT_SPRITE_BORDER_SIZE: number = 1; // TODO: will not render correct if changed
  readonly CURRENT_SPRITE_STROKE_COLOR: number = 0xffffff;
  readonly CURRENT_SPRITE_STROKE_ALPHA: number = 1;
  readonly SPRITE_DEFAULT_CELL_SIZE: number = 8;
  readonly SPRITE_SHEET_HEIGHT: number = 16;
  readonly SPRITE_SHEET_WIDTH: number = 16;
  readonly SPRITE_SHEET_BORDER_SIZE: number = 1; // TODO: will not render correct if changed
  readonly SPRITE_SHEET_BORDER_STROKE_COLOR: number = 0xffffff;
  readonly SPRITE_SHEET_BORDER_STROKE_ALPHA: number = 1;
  readonly SPRITE_SHEET_POSITION: number[] = [150, 20];
  private SPRITE_SHEET_UI_BORDER: Phaser.GameObjects.Graphics;

  // DRAW AREA VARIABLES
  readonly CURRENT_PIXEL_BORDER_SIZE: number = 1; // TODO: will not render correct if changed
  readonly CURRENT_PIXEL_STROKE_COLOR: number = 0xffffff;
  readonly CURRENT_PIXEL_STROKE_ALPHA: number = 1;
  readonly DRAW_AREA_BORDER = {
    SIZE: 1, // TODO: will not render correct if changed
    STROKE_COLOR: 0xffffff,
    STROKE_ALPHA: 1
  };
  private DRAW_AREA_CELLS: Phaser.GameObjects.Group;
  readonly DRAW_AREA_CELL_SIZE: number = 10;
  readonly DRAW_AREA_HEIGHT: number = 8;
  readonly DRAW_AREA_POSITION: number[] = [60, 20];
  private DRAW_AREA_UI_BORDER: Phaser.GameObjects.Graphics;
  readonly DRAW_AREA_WIDTH: number = 8;

  // MENU ICONS
  private swapVerticalIcon: Phaser.GameObjects.Image;
  private swapHorizontalIcon: Phaser.GameObjects.Image;
  private trashIcon: Phaser.GameObjects.Image;

  // GENERAL VARIABLES
  private borderOfCurrentColorOnPalette: Phaser.GameObjects.Graphics;
  private borderOfCurrentSpriteOnSpriteSheet: Phaser.GameObjects.Graphics;
  private borderOfCurrentPixelOnDrawArea: Phaser.GameObjects.Graphics;
  private currentColor: number = this.PALETTE_COLORS[0];
  private currentSprite: Sprite;
  private tempSprites: Sprite[];
  private sprites: Phaser.GameObjects.Sprite[];

  constructor() {
    super({
      key: "SpriteEditorScene"
    });
  }

  init(): void {
    this.initVariables();
    this.initInput();
  }

  create(): void {
    this.drawColorPaletteUI();
    this.createSpriteSheetUI();
    this.createDrawAreaUI();
    this.createMenu();
  }

  /**
   * Init variables
   */
  private initVariables(): void {
    // Create current color border on color palette
    this.borderOfCurrentColorOnPalette = this.add.graphics();
    this.borderOfCurrentColorOnPalette
      .lineStyle(
        this.CURRENT_COLOR_BORDER_SIZE,
        this.CURRENT_COLOR_STROKE_COLOR,
        this.CURRENT_COLOR_STROKE_ALPHA
      )
      .setDepth(1);
    this.borderOfCurrentColorOnPalette.strokeRect(
      this.PALETTE_POSITION[0],
      this.PALETTE_POSITION[1] - this.CURRENT_COLOR_BORDER_SIZE,
      this.PALETTE_CELL_SIZE + this.CURRENT_COLOR_BORDER_SIZE,
      this.PALETTE_CELL_SIZE + this.CURRENT_COLOR_BORDER_SIZE
    );

    // Create current sprite border on sprite sheet
    this.borderOfCurrentSpriteOnSpriteSheet = this.add.graphics();
    this.borderOfCurrentSpriteOnSpriteSheet
      .lineStyle(
        this.CURRENT_SPRITE_BORDER_SIZE,
        this.CURRENT_SPRITE_STROKE_COLOR,
        this.CURRENT_SPRITE_STROKE_ALPHA
      )
      .setDepth(1);
    this.borderOfCurrentSpriteOnSpriteSheet.strokeRect(
      this.SPRITE_SHEET_POSITION[0],
      this.SPRITE_SHEET_POSITION[1] - this.CURRENT_SPRITE_BORDER_SIZE,
      this.SPRITE_DEFAULT_CELL_SIZE + this.CURRENT_SPRITE_BORDER_SIZE,
      this.SPRITE_DEFAULT_CELL_SIZE + this.CURRENT_SPRITE_BORDER_SIZE
    );

    // Create current pixel border on draw area
    this.borderOfCurrentPixelOnDrawArea = this.add.graphics();
    this.borderOfCurrentPixelOnDrawArea
      .lineStyle(
        this.CURRENT_PIXEL_BORDER_SIZE,
        this.CURRENT_PIXEL_STROKE_COLOR,
        this.CURRENT_PIXEL_STROKE_ALPHA
      )
      .setDepth(1);
    this.borderOfCurrentPixelOnDrawArea.strokeRect(
      this.DRAW_AREA_POSITION[0],
      this.DRAW_AREA_POSITION[1] - this.CURRENT_PIXEL_BORDER_SIZE,
      this.DRAW_AREA_CELL_SIZE + this.CURRENT_PIXEL_BORDER_SIZE,
      this.DRAW_AREA_CELL_SIZE + this.CURRENT_PIXEL_BORDER_SIZE
    );
    this.cameras.main.setBackgroundColor(this.PALETTE_COLORS[15]);
  }

  /**
   * Our input manager
   * TODO: Use the command behavioral pattern
   */
  private initInput(): void {
    this.input.on("gameobjectdown", (pointer, gameObject) => {
      if (gameObject.name === "COLOR_OF_PALETTE") {
        // OK, we have selected a game object of the color palette
        this.currentColor = gameObject.fillColor;

        this.borderOfCurrentColorOnPalette.clear();

        this.borderOfCurrentColorOnPalette.strokeRect(
          gameObject.x,
          gameObject.y - this.CURRENT_COLOR_BORDER_SIZE,
          this.PALETTE_CELL_SIZE + this.CURRENT_COLOR_BORDER_SIZE,
          this.PALETTE_CELL_SIZE + this.CURRENT_COLOR_BORDER_SIZE
        );
      } else if (gameObject.name === "SPRITE") {
        // OK, we have selected a game object of the sprite sheet
        this.currentSprite = this.tempSprites[gameObject.id];
        this.drawDrawAreaField();
        this.borderOfCurrentSpriteOnSpriteSheet.clear();
        this.borderOfCurrentSpriteOnSpriteSheet.strokeRect(
          gameObject.x,
          gameObject.y - this.CURRENT_SPRITE_BORDER_SIZE,
          this.SPRITE_DEFAULT_CELL_SIZE + this.CURRENT_SPRITE_BORDER_SIZE,
          this.SPRITE_DEFAULT_CELL_SIZE + this.CURRENT_SPRITE_BORDER_SIZE
        );
      } else if (gameObject.name === "COLOR_OF_DRAW_AREA") {
        // OK, we have selected a game object of the draw area
        let x =
          (gameObject.x - this.DRAW_AREA_POSITION[0]) /
          this.DRAW_AREA_CELL_SIZE;
        let y =
          (gameObject.y - this.DRAW_AREA_POSITION[1]) /
          this.DRAW_AREA_CELL_SIZE;

        this.currentSprite.changePointColor(x, y, this.currentColor);
        gameObject.fillColor = this.currentColor;
      } else if (gameObject.name === "TRASH") {
        this.resetColorsOfCurrentSprite();
        this.drawDrawAreaField();
      } else if (gameObject.name === "SWAP_HORIZONTAL") {
        this.swapHorizontal();
        this.drawDrawAreaField();
      } else if (gameObject.name === "SWAP_VERTICAL") {
        this.swapVertical();
        this.drawDrawAreaField();
      }
    });

    this.input.on("gameobjectover", (pointer, gameObject) => {
      if (gameObject.name === "TRASH") {
        this.trashIcon.setTintFill(this.PALETTE_COLORS[12]);
      } else if (gameObject.name === "SWAP_HORIZONTAL") {
        this.swapHorizontalIcon.setTintFill(this.PALETTE_COLORS[12]);
      } else if (gameObject.name === "SWAP_VERTICAL") {
        this.swapVerticalIcon.setTintFill(this.PALETTE_COLORS[12]);
      }
    });

    this.input.on("gameobjectout", (pointer, gameObject) => {
      if (gameObject.name === "TRASH") {
        this.trashIcon.setTintFill(this.PALETTE_COLORS[14]);
      } else if (gameObject.name === "SWAP_HORIZONTAL") {
        this.swapHorizontalIcon.setTintFill(this.PALETTE_COLORS[14]);
      } else if (gameObject.name === "SWAP_VERTICAL") {
        this.swapVerticalIcon.setTintFill(this.PALETTE_COLORS[14]);
      }
    });

    this.input.on("gameobjectmove", (pointer, gameObject, event) => {
      if (gameObject.name === "COLOR_OF_DRAW_AREA") {
        // OK, we have selected a game object of the draw area
        this.borderOfCurrentPixelOnDrawArea.clear();
        this.borderOfCurrentPixelOnDrawArea.strokeRect(
          gameObject.x,
          gameObject.y - this.CURRENT_PIXEL_BORDER_SIZE,
          this.DRAW_AREA_CELL_SIZE + this.CURRENT_PIXEL_BORDER_SIZE,
          this.DRAW_AREA_CELL_SIZE + this.CURRENT_PIXEL_BORDER_SIZE
        );

        if (pointer.isDown) {
          // set new color
          let x =
            (gameObject.x - this.DRAW_AREA_POSITION[0]) /
            this.DRAW_AREA_CELL_SIZE;
          let y =
            (gameObject.y - this.DRAW_AREA_POSITION[1]) /
            this.DRAW_AREA_CELL_SIZE;

          this.currentSprite.changePointColor(x, y, this.currentColor);
          gameObject.fillColor = this.currentColor;
        }
      } else {
        this.borderOfCurrentPixelOnDrawArea.clear();
      }
    });
  }

  //****************************************************************************
  // KEY FUNCTIONS
  //****************************************************************************
  private resetColorsOfCurrentSprite(): void {
    for (let y = 0; y < this.DRAW_AREA_HEIGHT; y++) {
      for (let x = 0; x < this.DRAW_AREA_WIDTH; x++) {
        this.changePixelColor(x, y, this.PALETTE_COLORS[0]);
      }
    }
  }

  private swapHorizontal(): void {
    for (let row = 0; row < this.SPRITE_DEFAULT_CELL_SIZE; row++) {
      for (let index = 0; index < this.SPRITE_DEFAULT_CELL_SIZE / 2; index++) {
        this.swap(
          this.currentSprite.getPoint(index, row),
          this.currentSprite.getPoint(
            this.SPRITE_DEFAULT_CELL_SIZE - 1 - index,
            row
          )
        );
      }
    }
  }

  private swapVertical(): void {
    for (let column = 0; column < this.SPRITE_DEFAULT_CELL_SIZE; column++) {
      for (let index = 0; index < this.SPRITE_DEFAULT_CELL_SIZE / 2; index++) {
        this.swap(
          this.currentSprite.getPoint(column, index),
          this.currentSprite.getPoint(
            column,
            this.SPRITE_DEFAULT_CELL_SIZE - 1 - index
          )
        );
      }
    }
  }

  private swap(a: Point, b: Point): void {
    let temp = a.getColor();
    this.changePixelColor(a.getPosition().x, a.getPosition().y, b.getColor());
    this.changePixelColor(b.getPosition().x, b.getPosition().y, temp);
  }

  private changePixelColor(x: number, y: number, color: number): void {
    this.currentSprite.changePointColor(x, y, color);
  }

  //****************************************************************************
  // COLOR PALETTE
  //****************************************************************************

  private drawColorPaletteUI(): void {
    // Draw the color palette ui
    let currentColorCount: number = 0;
    for (let y = 0; y < this.PALETTE_HEIGHT; y++) {
      for (let x = 0; x < this.PALETTE_WIDTH; x++) {
        this.add
          .rectangle(
            x * this.PALETTE_CELL_SIZE + this.PALETTE_POSITION[0],
            y * this.PALETTE_CELL_SIZE + this.PALETTE_POSITION[1],
            this.PALETTE_CELL_SIZE,
            this.PALETTE_CELL_SIZE,
            this.PALETTE_COLORS[currentColorCount],
            1
          )
          .setOrigin(0, 0)
          .setInteractive()
          .setName("COLOR_OF_PALETTE");
        currentColorCount += 1;
      }
    }

    // Draw the color palette ui border
    let colorPaletteUIBorder = this.add.graphics();
    colorPaletteUIBorder.lineStyle(
      this.PALETTE_BORDER_SIZE,
      this.PALETTE_BORDER_STROKE_COLOR,
      this.PALETTE_BORDER_STROKE_ALPHA
    );
    colorPaletteUIBorder.strokeRect(
      this.PALETTE_POSITION[0],
      this.PALETTE_POSITION[1] - this.PALETTE_BORDER_SIZE,
      this.PALETTE_WIDTH * this.PALETTE_CELL_SIZE + this.PALETTE_BORDER_SIZE,
      this.PALETTE_HEIGHT * this.PALETTE_CELL_SIZE + this.PALETTE_BORDER_SIZE
    );
  }

  //****************************************************************************
  // SPRITE SHEET
  //****************************************************************************

  private createSpriteSheetUI(): void {
    this.drawSpriteSheet();
    this.drawSpriteSheetBorder();
  }

  private drawSpriteSheet(): void {
    // Create the sprites from the sprite sheet and draw them
    this.tempSprites = [];
    let counter: number = 0;
    for (let y = 0; y < this.SPRITE_SHEET_HEIGHT; y++) {
      for (let x = 0; x < this.SPRITE_SHEET_WIDTH; x++) {
        let tempSprite = new Sprite(
          this,
          counter,
          this.PALETTE_COLORS[0],
          this.SPRITE_DEFAULT_CELL_SIZE
        ).setPosition(
          x * this.SPRITE_DEFAULT_CELL_SIZE + this.SPRITE_SHEET_POSITION[0],
          y * this.SPRITE_DEFAULT_CELL_SIZE + this.SPRITE_SHEET_POSITION[1]
        );
        tempSprite.setInteractive(
          new Phaser.Geom.Rectangle(
            0,
            0,
            this.SPRITE_DEFAULT_CELL_SIZE,
            this.SPRITE_DEFAULT_CELL_SIZE
          ),
          Phaser.Geom.Rectangle.Contains
        );
        tempSprite.setName("SPRITE");

        this.tempSprites.push(tempSprite);
        counter += 1;
      }
    }

    this.currentSprite = this.tempSprites[0];
  }

  private drawSpriteSheetBorder(): void {
    // Draw the draw area ui border
    if (this.SPRITE_SHEET_UI_BORDER) {
      // Clear it
      this.SPRITE_SHEET_UI_BORDER.clear();
    } else {
      this.SPRITE_SHEET_UI_BORDER = this.add.graphics();
    }

    this.SPRITE_SHEET_UI_BORDER.lineStyle(
      this.SPRITE_SHEET_BORDER_SIZE,
      this.SPRITE_SHEET_BORDER_STROKE_COLOR,
      this.SPRITE_SHEET_BORDER_STROKE_ALPHA
    );
    this.SPRITE_SHEET_UI_BORDER.strokeRect(
      this.SPRITE_SHEET_POSITION[0],
      this.SPRITE_SHEET_POSITION[1] - this.SPRITE_SHEET_BORDER_SIZE,
      this.SPRITE_SHEET_WIDTH * this.SPRITE_DEFAULT_CELL_SIZE +
        this.SPRITE_SHEET_BORDER_SIZE,
      this.SPRITE_SHEET_HEIGHT * this.SPRITE_DEFAULT_CELL_SIZE +
        this.SPRITE_SHEET_BORDER_SIZE
    );
  }

  //****************************************************************************
  // DRAW AREA
  //****************************************************************************

  private createDrawAreaUI(): void {
    this.drawDrawAreaField();
    this.drawDrawAreaBorder();
  }

  private drawDrawAreaField(): void {
    if (this.DRAW_AREA_CELLS) {
      // The group with the rectangles already exists, to clear all the childrens
      this.DRAW_AREA_CELLS.clear(true);
    } else {
      // The group with the rectangles does not exist, add it to the scene
      this.DRAW_AREA_CELLS = this.add.group();
    }

    // Loop through the draw area and draw the rectangles
    for (let y = 0; y < this.DRAW_AREA_HEIGHT; y++) {
      for (let x = 0; x < this.DRAW_AREA_WIDTH; x++) {
        this.DRAW_AREA_CELLS.add(
          this.add
            .rectangle(
              x * this.DRAW_AREA_CELL_SIZE + this.DRAW_AREA_POSITION[0],
              y * this.DRAW_AREA_CELL_SIZE + this.DRAW_AREA_POSITION[1],
              this.DRAW_AREA_CELL_SIZE,
              this.DRAW_AREA_CELL_SIZE,
              this.currentSprite.getPoint(x, y).getColor(),
              1
            )
            .setOrigin(0, 0)
            .setInteractive()
            .setName("COLOR_OF_DRAW_AREA")
        );
      }
    }
  }

  private drawDrawAreaBorder(): void {
    // Draw the draw area ui border
    if (this.DRAW_AREA_UI_BORDER) {
      // Clear it
      this.DRAW_AREA_UI_BORDER.clear();
    } else {
      this.DRAW_AREA_UI_BORDER = this.add.graphics();
    }

    this.DRAW_AREA_UI_BORDER.lineStyle(
      this.DRAW_AREA_BORDER.SIZE,
      this.DRAW_AREA_BORDER.STROKE_COLOR,
      this.DRAW_AREA_BORDER.STROKE_ALPHA
    );
    this.DRAW_AREA_UI_BORDER.strokeRect(
      this.DRAW_AREA_POSITION[0],
      this.DRAW_AREA_POSITION[1] - this.DRAW_AREA_BORDER.SIZE,
      this.DRAW_AREA_WIDTH * this.DRAW_AREA_CELL_SIZE +
        this.DRAW_AREA_BORDER.SIZE,
      this.DRAW_AREA_HEIGHT * this.DRAW_AREA_CELL_SIZE +
        this.DRAW_AREA_BORDER.SIZE
    );
  }

  private createMenu(): void {
    this.swapVerticalIcon = this.add
      .image(100, 105, "swapVertical")
      .setOrigin(0, 0)
      .setInteractive()
      .setName("SWAP_VERTICAL");

    this.swapHorizontalIcon = this.add
      .image(115, 105, "swapHorizontal")
      .setOrigin(0, 0)
      .setInteractive()
      .setName("SWAP_HORIZONTAL");

    this.trashIcon = this.add
      .image(130, 105, "trash")
      .setOrigin(0, 0)
      .setInteractive()
      .setName("TRASH");
  }
}
