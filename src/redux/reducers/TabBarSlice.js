import { createSlice } from "@reduxjs/toolkit";

const TabBarStore = {
    height: 0
}

const TabBarSlice = createSlice({
    name: 'TabBarSlice',
    initialState: Object.assign({}, TabBarStore),
    reducers: {
        setHeightTabBar: (state, action) => {
            state.height = action.payload;
        }
    }
});

export const { setHeightTabBar } = TabBarSlice.actions;
export default TabBarSlice.reducer;