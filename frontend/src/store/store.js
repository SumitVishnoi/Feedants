import { configureStore } from "@reduxjs/toolkit";

import competitionReducer from "./slices/competitionSlice";

export const store = configureStore({
  reducer: {
    competition: competitionReducer,
  },
});