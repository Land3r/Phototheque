import { GALLERIES_ACTIONS } from './actions_types';

export const setGalleries = item => ({
  type: GALLERIES_ACTIONS.GALLERIES_SET,
  item
})

export const addGalleries = item => ({
    type: GALLERIES_ACTIONS.GALLERIES_ADD,
    item
})

export const removeGalleries = item => ({
    type: GALLERIES_ACTIONS.GALLERIES_REMOVE,
    item
})

export const updateGalleries = item => ({
  type: GALLERIES_ACTIONS.GALLERIES_UPDATE,
  item
})

export const clearGalleries = () => ({
  type: GALLERIES_ACTIONS.GALLERIES_CLEAR
})