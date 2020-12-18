import { IPortalConstructor } from '../interfaces/portal.interface';
import { IPortalDestination } from '../interfaces/portal-destination.interface';

export class Portal extends Phaser.GameObjects.Zone {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private currentScene: Phaser.Scene;
  private portalDestinationForMario: IPortalDestination;

  public getPortalDestination(): IPortalDestination {
    return this.portalDestinationForMario;
  }

  constructor(aParams: IPortalConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.width, aParams.height);

    // variables
    this.currentScene = aParams.scene;
    this.portalDestinationForMario = aParams.spawn;

    this.initZone();
    this.currentScene.add.existing(this);
  }

  private initZone() {
    this.setOrigin(0, 0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(this.height, this.width);
    this.body.setOffset(0, 0);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  update(): void {}
}
