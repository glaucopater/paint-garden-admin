import { combineReducers } from 'redux'
import { imagesReducer, sectionsReducer } from '../Sections/reducers'

const reducers = combineReducers({
  images: imagesReducer,
  sections: sectionsReducer,
})

export default reducers
