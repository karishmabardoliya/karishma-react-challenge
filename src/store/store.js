import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../reducer/postReducer'
import universitiesReducer from '../reducer/universitiesReducer'

const store = configureStore({
  reducer: {
    post: postReducer,
    university: universitiesReducer
  },
})

export default store