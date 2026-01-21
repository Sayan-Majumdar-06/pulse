import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    session: [],
    break: [],
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateFocusStats: (state, action) => {
        state.session.push(action.payload)
    },

    updateBreakStats: (state, action) => {
        state.break.push(action.payload)
    },
  },
})

export const { updateFocusStats, updateBreakStats } = statsSlice.actions

export default statsSlice.reducer