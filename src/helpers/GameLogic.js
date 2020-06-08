/* eslint-disable no-console */

const checkIsInteger = (received) => {
  if (Number.isInteger(received)) {
    return true;
  }
  const message = `Expected variable to be an integer, instead received a ${typeof received}`;
  console.log(message);
  return false;
};

export const calcDecreaseScore = (values) => {
  if (!checkIsInteger(values.score)) return false;

  if (values.score >= 10) {
    values.score -= 10;
    return true;
  }
  return false;
};

export const calcIncreaseScore = (values) => {
  if (!checkIsInteger(values.score)) return false;

  values.score += 10;
  return true;
};

export const decreasePlayerHealth = (values) => {
  if (!checkIsInteger(values.health)) return false;

  if (values.health > 0) {
    values.health -= 25;
  }

  return values.health;
};

export const increaseShooting = (values) => {
  if (!checkIsInteger(values.shootingPower)) return false;

  if (values.shootingPower < 3) {
    values.shootingPower += 1;
    return true;
  }
  return false;
};

export const decreaseShooting = (values) => {
  if (!checkIsInteger(values.shootingPower)) return false;

  if (values.shootingPower > 1) {
    values.shootingPower -= 1;
    return true;
  }
  return false;
};

export const setUpCounter = (values) => {
  if (
    !checkIsInteger(values.timerShootCounter)
    || !checkIsInteger(values.timerShootDelay)
  ) return false;

  values.timerShootCounter = values.timerShootDelay - 1;
  return true;
};

export const increaseShootCounter = (values) => {
  if (!checkIsInteger(values.timerShootCounter)) return false;

  values.timerShootCounter += 1;
  return true;
};

export const decreaseMeteorHealth = (values) => {
  if (!checkIsInteger(values.health)) return false;

  if (values.health >= 1) {
    values.health -= 1;
    return true;
  }
  return false;
};