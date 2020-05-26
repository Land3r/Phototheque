import { combineReducers,  } from 'redux';
import medias from './medias';
import galleries from './galleries'
import folders from './folders'

const rootReducer = combineReducers({
  medias,
  galleries,
  folders
});

export default rootReducer;
