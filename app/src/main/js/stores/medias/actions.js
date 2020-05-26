import { MEDIAS_ACTIONS } from './actions_types';

export const setMedia = item => ({
  type: MEDIAS_ACTIONS.MEDIA_SET,
  item
});

export const clearMedia = () => ({
  type: MEDIAS_ACTIONS.MEDIA_CLEAR
});

export const setMedias = item => ({
  type: MEDIAS_ACTIONS.MEDIAS_SET,
  item
});

export const addMedias = item => ({
    type: MEDIAS_ACTIONS.MEDIAS_ADD,
    item
});

export const removeMedias = item => ({
    type: MEDIAS_ACTIONS.MEDIAS_REMOVE,
    item
});

export const updateMedias = item => ({
  type: MEDIAS_ACTIONS.MEDIAS_UPDATE,
  item
})

export const clearMedias = () => ({
  type: MEDIAS_ACTIONS.MEDIAS_CLEAR
});
