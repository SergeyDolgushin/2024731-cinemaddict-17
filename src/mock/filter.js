import { filter } from '../utils/filter.js';

export const generateFilter = (filmsCards) => Object.entries(filter).map(
  ([filterName, filterCards]) => ({
    name: filterName,
    count: filterCards(filmsCards).length,
  }),
);

