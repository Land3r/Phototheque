import { FOLDERS_ACTIONS } from './actions_types';
import { FOLDERS } from './default_state';
import FileStore from '../file-store'

const store = new FileStore({
  fileName: 'folders',
  defaults: FOLDERS,
})

export default (state = FOLDERS, action) => {
    let folders = state.folders
  switch (action.type) {
    case FOLDERS_ACTIONS.FOLDERS_INIT:
      let fileContent = store.get()
      return { ...state, ...fileContent}
    case FOLDERS_ACTIONS.FOLDERS_SAVE:
      store.set({...folders})
      return { ...state }
    case FOLDERS_ACTIONS.FOLDERS_SET:
      return { ...state, folders: action.item };
    case FOLDERS_ACTIONS.FOLDERS_ADD:
    folders.push(action.item)
      return { ...state, folders: folders };
    case FOLDERS_ACTIONS.FOLDERS_UPDATE:
      let folderIndex = folders.findIndex((element) => {
        return element._id == action.item._id
      })
      if (folderIndex != -1) {
        folders.splice(folderIndex, 1, {...action.item})
        return {...state, folders: folders}
      }
      else {
        console.log('Folders with id ' + action.item._id + ' couldn\'t be updated as it was not found on store.')
        return {...state}
      }
    case FOLDERS_ACTIONS.FOLDERS_REMOVE:
        let folderId = state.folders.findIndex(action.item)
        folders.splice(folderId, 1)
      return { ...state, folders: folders };
    case FOLDERS_ACTIONS.FOLDERS_CLEAR:
      return { ...state, folders: [] };
    default:
      return state;
  }
};