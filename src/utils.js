const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomFloat(min, max, decimalPlace) {
  if (min < max) {
    const randomNumber = Math.random() * (max - min) + min;
    const precision = 10 ** decimalPlace;

    return Math.round(randomNumber * precision) / precision;
  }

  return -1;
}

const convertTimeDuration = (minute) => {

  const hourDuration = Math.floor(minute / 60);
  const minuteDuration = minute % 60;

  return `${hourDuration}h ${minuteDuration}m`;
};

const generateId = () => {
  let currentId = 0;
  return () => currentId++;
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export { getRandomInteger, getRandomFloat, convertTimeDuration, generateId, getRandomArrayElement, getRandomBoolean };
