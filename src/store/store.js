import { configureStore } from '@reduxjs/toolkit'
import postalLookupReducer from '../reducer/postalLookupReducer'
import postReducer from '../reducer/postReducer'
import universitiesReducer from '../reducer/universitiesReducer'

const store = configureStore({
  reducer: {
    post: postReducer,
    university: universitiesReducer,
    postallookup: postalLookupReducer
  },
})

export default store