import { GALLERIES_ACTIONS } from './actions_types';

export const setGalleries = item => ({
  type: GALLERIES_ACTIONS.GALLERIES_SET,
  item, // shorthand for item: item
});

export const addGalleries = item => ({
    type: GALLERIES_ACTIONS.GALLERIES_ADD,
    item
});

export const removeGalleries = item => ({
    type: GALLERIES_ACTIONS.GALLERIES_REMOVE,
    item
});

export const clearGalleries = () => ({
  type: GALLERIES_ACTIONS.GALLERIES_CLEAR,
});
