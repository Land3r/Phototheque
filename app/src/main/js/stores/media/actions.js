import { MEDIA_ACTIONS } from './actions_types';

export const setItem = item => ({
  type: MEDIA_ACTIONS.ITEM_SET,
  item, // shorthand for item: item
});

export const clearItem = () => ({
  type: MEDIA_ACTIONS.ITEM_CLEAR,
});
