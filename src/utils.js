import dayjs from 'dayjs';

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

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getYear = (date) => dayjs(date).format('YYYY');
const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');

const setActiveClass = (isActive, activeClass) => isActive ? activeClass : '';

const compareProperties = (a, b) => b > a;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, getRandomFloat, convertTimeDuration, generateId, getRandomArrayElement, getRandomBoolean, setActiveClass, getYear, humanizeDate, humanizeDateTime, compareProperties, updateItem };
