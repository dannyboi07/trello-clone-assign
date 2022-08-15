import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import boardReducer from "../features/board/boardsSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    boards: boardReducer
  },
});
