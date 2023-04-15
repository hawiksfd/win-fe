import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, privateApi } from "../services/setupInterceptor";

export const getProducts = createAsyncThunk("GET_PRODUCT", async () => {
  const response = await privateApi.get("product/");
  return response;
});

export const getProduct = createAsyncThunk("GET_PRODUCT_ID", async (id) => {
  const response = await privateApi.get(`product/${id}`);
  // console.log(response);
  return response;
});

export const createProducts = createAsyncThunk(
  "CREATE_PRODUCT",
  async ({ name, price }) => {
    const respCreate = await privateApi.post("product/create", {
      name,
      price,
    });
  }
);

export const editProduct = createAsyncThunk(
  "EDIT_PRODUCT",
  async ({ id, name, price }) => {
    const respEdit = await privateApi.put(`product/edit/${id}`, {
      name,
      price,
    });
  }
);

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", async (id) => {
  await privateApi.delete(`product/delete/${id}`);
  return id;
});

const initialState = {
  product: [],
  prdId: {},
};

// buat createslice product
const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.prdId = action.payload;
      });
  },
});

export default product.reducer;
