import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {Product} from '../../models';
import {RootState} from './index';

const Products = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    setProduct(state, action) {
      return action.payload;
    },
  },
});

export const {setProduct} = Products.actions;

export const getProducts =
  (filter: any = {}): AppThunk =>
  async (dispatch: Dispatch) => {
    //TODO call service
    const list: any = [];
    return list;
  };

export const productSelectors = {
  select: (state: RootState): Product | null => state.accounts,
};

export default Products.reducer;
