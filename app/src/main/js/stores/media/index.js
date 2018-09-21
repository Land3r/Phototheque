import { MEDIA_ACTIONS } from './actions_types';
import { MEDIA } from './default_state';

export default (state = MEDIA, action) => {
  switch (action.type) {
    case MEDIA_ACTIONS.ITEM_SET:
      return { ...state, media: action.item };
    case MEDIA_ACTIONS.ITEM_CLEAR:
      return { ...state, media: null };
    default:
      return state;
  }
};
