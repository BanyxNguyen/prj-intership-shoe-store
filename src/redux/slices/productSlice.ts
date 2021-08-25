import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {FilterOptions, Product} from '../../models';
import {RootState} from './index';

interface InitState {
  products: Product[];
}

const initialState: InitState = {
  products: [],
};

const Products = createSlice({
  name: 'products',
  initialState,
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

// export const submitFilter

export const productSelectors = {
  select: (state: RootState): Product | null => state.accounts,
};

export default Products.reducer;
