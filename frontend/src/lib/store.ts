import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from './features/authSlice';
import todoSlice from './features/todoSlice';
import friendsSlice from './features/friendsSlice';

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      todo: todoSlice,
      friends: friendsSlice,
    }
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;