# Game Config

---

## Key Points

- The configuration object for your Phaser Game instance
- Type: Phaser.Types.Core.GameConfig

---

```ts
const GameConfig: Phaser.Types.Core.GameConfig = {};

const game = new Game(GameConfig);
```

---

## Parameters

### width

- Game width in game pixels
- Default: 1024

--

### height

- Game height in game pixels
- Default: 768

--

### title

- Game title shown in browser console
- Default: ''

--

### url

- Game url shown in browser console
- Default: 'https://phaser.io'

--

### version

- Game version shown in browser console
- Default: ''

--

### backgroundColor

- Background color of game canvas
- Default: 0 (= black)
- Ignored if transparent set to true

--

### type

- Renderer type: CANVAS, WEBGL or HEADLESS
- Default: CONST.AUTO

--

### parent

- Linking canvas to DOM element
- Default: undefined

--

### physics

- The physics configuration object
- Type: Phaser.Types.Core.PhysicsConfig
- Default: {}

--

### physics.default

- Physics system: ARCADE, IMPACT or MATTER
- Default: false

--

### physics.arcade

- The arcade physics configuration object
- Type: Phaser.Types.Physics.Arcade.ArcadeWorldConfig

--

### physics.arcade.gravity

- Arcade gravity with x and y components
- Type: Phaser.Types.Math.Vector2Like

--

### scene

- One or multiple game scenes
- The first one is started
- Default: null
