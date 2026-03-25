import { configureStore } from "@reduxjs/toolkit";

import { commentReducer } from "./Services/Reducers/commentReducer";
import { likeReducer } from "./Services/Reducers/likeReducer";
import { authReducer } from "./Services/Reducers/authReducer";
import { followReducer } from "./Services/Reducers/followReducer";
import { profileReducer } from "./Services/Reducers/profileReducer";

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