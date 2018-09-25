import { combineReducers } from 'redux';
import media from '../stores/media';
import galleries from '../stores/galleries'

const rootReducer = combineReducers({
  media,
  galleries
});

export default rootReducer;
