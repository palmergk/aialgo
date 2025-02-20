import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wallet: {},
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateWallet: (state, action) => {
            state.wallet = action.payload
        }
    },
})

export const { updateWallet } = counterSlice.actions

export default counterSlice.reducer