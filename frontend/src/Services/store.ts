import { configureStore } from "@reduxjs/toolkit";

import { commentReducer } from "./Reducers/commentReducer";
import { likeReducer } from "./Reducers/likeReducer";
import { authReducer } from "./Reducers/authReducer";
import { followReducer } from "./Reducers/followReducer";
import { profileReducer } from "./Reducers/profileReducer";

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    likes: likeReducer,
    auth: authReducer,
    follow: followReducer,
    profile : profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;