import { combineReducers } from 'redux';
import list from './list';
import media from '../stores/media';
import galleries from '../stores/galleries'

const rootReducer = combineReducers({
  list, // shorthand for lists: lists
  media,
  galleries
});

export default rootReducer;
