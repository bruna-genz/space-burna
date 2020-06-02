import "phaser";
import Entity from "./Entities"

export default class Meteore extends Entity {
    constructor(scene, x, y) {
        let arr = ["enemy2_1", "enemy2_2", "enemy2_3", "enemy2_4"]
        let sprite = arr[Phaser.Math.Between(0, arr.length -1)]
        
        super(scene, x, y, sprite, "Meteore");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
    }
}