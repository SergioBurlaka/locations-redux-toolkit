import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./features/Todos/todosSlice";
import locationsReducer from "./features/Locations/locationsSlice";
import shopReducer from "./features/Shop/shopSlice";

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    todos: todosReducer,
    shop: shopReducer,
  },
});
