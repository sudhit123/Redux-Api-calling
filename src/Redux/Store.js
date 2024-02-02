import { configureStore } from "@reduxjs/toolkit";
import apicalled from './Reducer'
export const store = configureStore({
    reducer: {
        list: apicalled
    },
})