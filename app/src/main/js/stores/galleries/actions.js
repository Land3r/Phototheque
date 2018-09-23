import { GALLERIES_ACTIONS } from './actions_types';

export const setItem = item => ({
  type: GALLERIES_ACTIONS.ITEM_SET,
  item, // shorthand for item: item
});

export const addItem = item => ({
    type: GALLERIES_ACTIONS.ITEM_ADD,
    item
});

export const removeItem = item => ({
    type: GALLERIES_ACTIONS.ITEM_REMOVE,
    item
});

export const clearItem = () => ({
  type: GALLERIES_ACTIONS.ITEM_CLEAR,
});
