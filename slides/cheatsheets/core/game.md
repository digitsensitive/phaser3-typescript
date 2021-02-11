# Game

---

## Key Points

- The Main Controller of the Game
- Handles booting, parsing the [configuration values](https://github.com/digitsensitive/phaser3-typescript/blob/master/slides/cheatsheets/core/config.md), creating the Renderer and setup global [Phaser Systems](https://github.com/digitsensitive/phaser3-typescript/blob/master/slides/cheatsheets/scene/systems.md) (f.e. input)
- When loaded, starts Scene Manager and the loop begins

---

> Avoid accessing any of the systems created by Game, and use instead those made available to you via Phaser.Scene

---

```ts
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
```

---

## Public Functions

### getFrame()

Get the current game frame

--

### getTime()

Get the current game timestamp

--

### destroy()

Destroy the game instance on the next frame
