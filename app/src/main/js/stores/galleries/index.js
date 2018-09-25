import { GALLERIES_ACTIONS } from './actions_types';
import { GALLERIES } from './default_state';

export default (state = GALLERIES, action) => {
    let galleries = state.galleries
  switch (action.type) {
    case GALLERIES_ACTIONS.ITEM_SET:
      return { ...state, galleries: action.item };
    case GALLERIES_ACTIONS.ITEM_ADD:
        galleries.push(action.item)
      return { ...state, galleries: galleries };
    case GALLERIES_ACTIONS.ITEM_REMOVE:
        let galleriyId = state.galleries.findIndex(action.item)
        galleries.splice(galleriyId, 1)
      return { ...state, galleries: galleries };
    case GALLERIES_ACTIONS.ITEM_CLEAR:
      return { ...state, galleries: [] };
    default:
      return state;
  }
};