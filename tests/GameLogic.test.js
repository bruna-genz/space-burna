import * as Logic from "../src/logic/GameLogic";

describe("Increase player score by 10", () => {
    test("initial score 0 should return 10", () => {
        let playerData = {
            score: 0
        }
    
        Logic.calcIncreaseScore(playerData);
    
        expect(playerData.score).toBe(10);
    })

    test("initial score 1000000000 should return 1000000010", () =>{
        let playerData = {
            score: 1000000000
        }
    
        Logic.calcIncreaseScore(playerData);
    
        expect(playerData.score).toBe(1000000010);
    })
})

describe("Decrease player score by 10", () => {
    test("initial score 100 should return 90", () => {
        let playerData = {
            score: 100
        }

        Logic.calcDecreaseScore(playerData);
        expect(playerData.score).toBe(90);
    })

    test("initial score 1000000000 should return 999999990", () => {
        let playerData = {
            score: 1000000000
        }

        Logic.calcDecreaseScore(playerData);
        expect(playerData.score).toBe(999999990);
    })

    test("don't change if score is less than 10", () =>{
        let playerData = {
            score: 0
        }

        Logic.calcDecreaseScore(playerData);
        expect(playerData.score).toBe(0);
    })
})

describe("Decrease player health by 25", () => {
    test("initial health 100 should return 75", () => {
        let playerData = {
            health: 100
        }

        Logic.decreasePlayerHealth(playerData);
        expect(playerData.health).toBe(75);
    })

    test("initial health 25 should return 0", () => {
        let playerData = {
            health: 25
        }

        Logic.decreasePlayerHealth(playerData);
        expect(playerData.health).toBe(0);
    })

    test("don't change if player health is 0", () => {
        let playerData = {
            health: 0
        }

        Logic.decreasePlayerHealth(playerData);
        expect(playerData.health).toBe(0);
    })
})

describe("Increase player shooting power by 1", () => {
    test("Shooting power 1 should return 2", () => {
        let playerData = {
            shootingPower: 1
        }

        Logic.increaseShooting(playerData);
        expect(playerData.shootingPower).toBe(2);
    })

    test("Shooting power 2 should return 3", () => {
        let playerData = {
            shootingPower: 2
        }

        Logic.increaseShooting(playerData);
        expect(playerData.shootingPower).toBe(3);
    })

    test("don't change if shooting power is already 3", () => {
        let playerData = {
            shootingPower: 3
        }

        Logic.increaseShooting(playerData);
        expect(playerData.shootingPower).toBe(3);
    })
})

describe("Decrease player shooting power by 1", () => {
    test("Shooting power 3 should return 2", () => {
        let playerData = {
            shootingPower: 3
        }

        Logic.decreaseShooting(playerData);
        expect(playerData.shootingPower).toBe(2);
    })

    test("Shooting power 2 should return 1", () => {
        let playerData = {
            shootingPower: 2
        }

        Logic.decreaseShooting(playerData);
        expect(playerData.shootingPower).toBe(1);
    })

    test("don't change if shooting power is 1", () => {
        let playerData = {
            shootingPower: 1
        }

        Logic.decreaseShooting(playerData);
        expect(playerData.shootingPower).toBe(1);
    })
})

describe("Set up counter", () => {
    test("timer shoot counter should be equal to shoot delay minus 1", () => {
        let playerData = {
            timerShootCounter: 0,
            timerShootDelay: 10
        }

        Logic.setUpCounter(playerData);
        expect(playerData.timerShootCounter).toBe(9)
    })
})

describe("Increase shoot counter by 1", () => {
    test("timer shoot counter 0 should return 1", () => {
        let playerData = {
            timerShootCounter: 0,
        }

        Logic.increaseShootCounter(playerData);
        expect(playerData.timerShootCounter).toBe(1)
    })

    test("timer shoot counter 9 should return 10", () => {
        let playerData = {
            timerShootCounter: 9,
        }

        Logic.increaseShootCounter(playerData);
        expect(playerData.timerShootCounter).toBe(10)
    })
})  

