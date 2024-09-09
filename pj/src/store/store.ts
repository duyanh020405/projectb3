import reducer from "@/store/reducer/reducer";
import products from "@/store/reducer/products";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    reducer,
    products,
  },
});
export default store;
