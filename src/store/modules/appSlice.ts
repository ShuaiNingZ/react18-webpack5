import { createSlice } from '@reduxjs/toolkit';
import { appSetting } from '@/settings/appSetting.ts';

const appSlice = createSlice({
    name: 'app',
    initialState: () => {
        return {
            ...appSetting
        };
    },
    reducers: {}
});

// export const {} = appSlice.actions;

export default appSlice.reducer;
