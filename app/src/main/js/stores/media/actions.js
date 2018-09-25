import { MEDIA_ACTIONS } from './actions_types';

export const setMedia = item => ({
  type: MEDIA_ACTIONS.MEDIA_SET,
  item, // shorthand for item: item
});

export const clearMedia = () => ({
  type: MEDIA_ACTIONS.MEDIA_CLEAR,
});
