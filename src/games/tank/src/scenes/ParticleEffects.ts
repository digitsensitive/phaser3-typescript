// export default class ParticleEffects extends Phaser.Scene
// {
// 	constructor()
// 	{
// 		super("ParticleEffects")
// 	}

// 	private handleCollectCoin(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
// {
// 	// other code...

// 	const particleEffects = this.scene.get(SceneKeys.ParticleEffects)
// 	particleEffects.events.emit('trail-to', {
// 		fromX: coin.x - this.cameras.main.scrollX,
// 		fromY: coin.y,
// 		toX: this.scoreLabel.x + this.scoreLabel.width * 0.5,
// 		toY: this.scoreLabel.y + this.scoreLabel.height * 0.5
// 	})

// 	const emitter = particles.createEmitter({
// 		x: data.fromX,
// 		y: data.fromY,
// 		quantity: 5,
// 		speed: { random: [50, 100] },
// 		lifespan: { random: [200, 400]},
// 		scale: { random: true, start: 1, end: 0 },
// 		rotate: { random: true, start: 0, end: 180 },
// 		angle: { random: true, start: 0, end: 270 },
// 		blendMode: 'ADD'
// 	})

// 		const xVals = [data.fromX, 300, 100, data.toX]
// 		const yVals = [data.fromY, 100, 150, data.toY]
		
// 		this.tweens.addCounter({
// 			from: 0,
// 			to: 1,
// 			ease: Phaser.Math.Easing.Sine.InOut,
// 			duration: 1000,
// 			onUpdate: tween => {
// 				const v = tween.getValue()
// 				const x = Phaser.Math.Interpolation.CatmullRom(xVals, v)
// 				const y = Phaser.Math.Interpolation.CatmullRom(yVals, v)

// 				emitter.setPosition(x, y)
// 			},
// 			onComplete: () => {
// 				emitter.explode(50, data.toX, data.toY)
// 				emitter.stop()

// 				this.time.delayedCall(1000, () => {
// 					particles.removeEmitter(emitter)
// 				})
// 			}
// 		})
// }
// }