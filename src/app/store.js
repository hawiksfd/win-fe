import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/auth";
import productSlice from "../reducers/product";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
