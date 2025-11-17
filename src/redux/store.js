import { configureStore } from "@reduxjs/toolkit";
import Login from './reducers/LoginSlice';
import TabBar from './reducers/TabBarSlice';

const AppStore = {
    reducer: {
        Login,
        TabBar
    }
}

export default configureStore(AppStore);