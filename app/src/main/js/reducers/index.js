import { combineReducers } from 'redux';
import list from './list';
import media from '../stores/media'

const rootReducer = combineReducers({
  list, // shorthand for lists: lists
  media
});

export default rootReducer;
