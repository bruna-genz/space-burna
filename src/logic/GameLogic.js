export const calcDecreaseScore = (values) => {
    if (values.score >= 10) {
        values.score -= 10
        return true
    }
    return false
}

export const calcIncreaseScore = (values) => {
    values.score += 10
    return true
}

export const decreasePlayerHealth = (values) => {
    if (values.health > 0) {
        values.health -= 25
    }

    return values.health
}

export const increaseShooting = (values) => {
    if(values.shootingPower < 3) {
        values.shootingPower += 1
    }
}

export const decreaseShooting = (values) => {
    if(values.shootingPower > 1) {
        values.shootingPower -= 1
    }
}

// PLAYER LOGIC

export const setUpCounter = (values) => {
    values.timerShootCounter = values.timerShootDelay - 1
}

export const increaseShootCounter = (values) => {
    values.timerShootCounter += 1
}