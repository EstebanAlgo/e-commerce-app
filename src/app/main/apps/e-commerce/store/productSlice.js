import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { Routes } from 'src/app/Routes';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async (productId) => {
  //const response = await axios.get(`/api/ecommerce/products/${productId}`);
  const response = await axios.get(`${Routes.api}/api/products/${productId}`);
  const data = await response.data;
  return data === undefined ? null : data;
});

export const removeProduct = createAsyncThunk(
  'eCommerceApp/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    //await axios.delete(`/api/ecommerce/products/${id}`);
    await axios.delete(`${Routes.api}/api/products/${id}`);
    return id;
  }
);

export const createProduct = createAsyncThunk(
  'eCommerceApp/product/createProduct',
  async (productData, { dispatch, getState }) => {
    //separamos en name y creamos cno handle con guiomes medios
    const { name } = productData;
    let handle = name.split(' ').join('-').toLowerCase();
    productData.handle = handle;
    const response = await axios.post(`${Routes.api}/api/products`, productData);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  'eCommerceApp/product/saveProduct',
  async (productData, { dispatch, getState }) => {
    //const { id } = getState().eCommerceApp;
    const { id } = productData;
    //const response = await axios.put(`/api/ecommerce/products/${id}`, productData);
    const response = await axios.put(`${Routes.api}/api/products/${id}`, productData);
    const data = await response.data;
    return data;
  }
);

const productSlice = createSlice({
  name: 'eCommerceApp/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          name: '',
          handle: '',
          description: '',
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: '',
          width: '',
          height: '',
          depth: '',
          weight: '',
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
