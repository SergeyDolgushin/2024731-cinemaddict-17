import dayjs from 'dayjs';

const getWeightForNullDate = (rateA, rateB) => {
  if (rateA === null && rateB === null) {
    return 0;
  }

  if (rateA === null) {
    return 1;
  }

  if (rateB === null) {
    return -1;
  }

  return null;
};

const sortDateUp = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortDateDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortRateDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);
  return weight ?? (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);
};

export { sortDateUp, sortDateDown, sortRateDown };

