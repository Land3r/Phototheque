import { MEDIAS_ACTIONS } from './actions_types';
import { MEDIAS } from './default_state';
import MediasService from '../../services/databases/mediasService'

export default (state = MEDIAS, action) => {
  let medias = state.medias
  switch (action.type) {
    case MEDIAS_ACTIONS.MEDIA_SET:
      return { ...state, media: action.item }
    case MEDIAS_ACTIONS.MEDIA_CLEAR:
      return { ...state, media: null }
    case MEDIAS_ACTIONS.MEDIAS_ADD:
      medias.push(action.item)
      return { ...state, medias: medias };
    case MEDIAS_ACTIONS.MEDIAS_CLEAR:
      return { ...state, medias: []}
    case MEDIAS_ACTIONS.MEDIAS_REMOVE:
      let mediaId = state.medias.findIndex(action.item)
      medias.splice(mediaId, 1)
      return { ...state, medias: medias}
    case MEDIAS_ACTIONS.MEDIAS_SET:
      return { ...state, medias: action.item };
    case MEDIAS_ACTIONS.MEDIAS_UPDATE:
      let mediaIndex = medias.findIndex((element) => {
        return element._id == action.item._id
      })
      if (mediaIndex != -1) {
        medias.splice(mediaIndex, 1, {...action.item})
        return {...state, medias: medias}
      }
      else {
        console.log('Media with id ' + action.item._id + ' couldn\'t be updated as it was not found on store.')
        return {...state}
      }
    default:
      return state
  }
}