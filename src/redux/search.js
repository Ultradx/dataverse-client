import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: null
  },
  reducers: {
    searchQuery: (state, action) => {
      state.query = action.payload
      // console.log(state.query);
    },
    clearQuery: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.query = null
    },
  }
})

// Action creators are generated for each case reducer function
export const { searchQuery, clearQuery } = searchSlice.actions

export const selectQuery = state => state.query;

export default searchSlice.reducer