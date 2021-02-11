# Scene

---

## Key Points

- Base class to extend directly from your scenes
- References to multiple systems and managers
  - Scene Systems
  - Animation Manager
  - Cache
  - Data Manager
  - Sound Manager
  - Game Object Factory
  - ...

---

```ts
export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(): void {}

  preload(): void {}

  create(): void {}

  update(time: number, delta: number): void {}
}
```

---

```ts
create(): void {
    this.add.image(10, 10, 'myImage');
}
```

---

## Public Functions

### init()

- Use it to define f.e. variables
- Called first by the Scene Manager when the scene starts

--

### preload()

- Use it to load assets

--

### create()

- Use it to create your game objects

--

### update()

- Should be overridden by your scene
- Called once per game step while the scene is running
