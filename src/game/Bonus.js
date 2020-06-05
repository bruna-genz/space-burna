import 'phaser';
import Entity from './Entities';

export default class Bonus extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.velocity.y = 300;
  }
}