import { FOLDERS_ACTIONS } from './actions_types';

export const initFolders = () => ({
  type: FOLDERS_ACTIONS.FOLDERS_INIT
})

export const saveFolders = () => ({
  type: FOLDERS_ACTIONS.FOLDERS_SAVE
})

export const setFolders = item => ({
  type: FOLDERS_ACTIONS.FOLDERS_SET,
  item, // shorthand for item: item
});

export const addFolders = item => ({
    type: FOLDERS_ACTIONS.FOLDERS_ADD,
    item
});

export const removeFolders = item => ({
    type: FOLDERS_ACTIONS.FOLDERS_REMOVE,
    item
});

export const updateFolders = item => ({
  type: FOLDERS_ACTIONS.FOLDERS_UPDATE,
  item
})

export const clearFolders = () => ({
  type: FOLDERS_ACTIONS.FOLDERS_CLEAR,
});