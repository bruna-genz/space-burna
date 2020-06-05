/* eslint-disable no-undef */
import 'phaser';
import Entity from './Entities';
import { decreaseMeteorHealth } from '../helpers/GameLogic';

export default class Meteore extends Entity {
  constructor(scene, x, y) {
    const arr = ['enemy2_1', 'enemy2_2', 'enemy2_3', 'enemy2_4'];
    const sprite = arr[Phaser.Math.Between(0, arr.length - 1)];

    super(scene, x, y, sprite, 'Meteore');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.body.setMass(7);
    this.setData('health', 3);
  }

  onDamage() {
    if (this.getData('health') === 1) {
      this.explode(true);
    } else {
      decreaseMeteorHealth(this.data.values);
    }
  }
}