import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './search'
import showReducer from './showCategory'

export default configureStore({
  reducer: {
    search: searchReducer,
    show: showReducer,
  },
})
