import { createSlice } from '@reduxjs/toolkit'

export const showSlice = createSlice({
  name: 'show',
  initialState: {
    show: false,
  },
  reducers: {
    show: (state) => {
      state.show = true
    },
    hide: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.show = false
    },
    check: (state, action) => {
      state.show = action.payload
      // console.log(state.query);
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, hide, check } = showSlice.actions

export const selectShow = (state) => state.show

export default showSlice.reducer
