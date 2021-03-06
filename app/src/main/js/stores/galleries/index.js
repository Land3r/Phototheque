import { GALLERIES_ACTIONS } from './actions_types'
import { GALLERIES } from './default_state'
import GalleriesService from '../../services/databases/galleriesService'
import MediasService from '../../services/databases/mediasService'

export default (state = GALLERIES, action) => {
    let galleries = state.galleries
  switch (action.type) {
    case GALLERIES_ACTIONS.GALLERIES_SET:
      return { ...state, galleries: action.item }
    case GALLERIES_ACTIONS.GALLERIES_ADD:
        galleries.push(action.item)
      return { ...state, galleries: galleries }
    case GALLERIES_ACTIONS.GALLERIES_UPDATE:
      let galleryIndex = galleries.findIndex((element) => {
        return element._id == action.item._id
      })
      if (galleryIndex != -1) {
        galleries.splice(galleryIndex, 1, {...action.item})
        return {...state, galleries: galleries}
      }
      else {
        console.log('Gallery with id ' + action.item._id + ' couldn\'t be updated as it was not found on store.')
        return {...state}
      }
    case GALLERIES_ACTIONS.GALLERIES_REMOVE:
        let galleriyId = state.galleries.findIndex(action.item)
        galleries.splice(galleriyId, 1)
      return { ...state, galleries: galleries }
    case GALLERIES_ACTIONS.GALLERIES_CLEAR:
      return { ...state, galleries: [] };
    default:
      return state;
  }
}
