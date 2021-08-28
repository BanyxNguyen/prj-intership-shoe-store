import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {FilterOptions, Product} from '../../models';
import {RootState} from './index';
import {productService} from '../../services';
import _ from 'lodash';

export interface ProductReduxType extends Product {
  amount: number;
  isSelected?: boolean;
}

interface InitState {
  wishlist: Product[];
  cart: ProductReduxType[];
}

const initialState: InitState = {
  wishlist: [],
  cart: [],
};

const Products = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      return action.payload;
    },
  },
});

export const {setProduct} = Products.actions;

// Cart
export const addItemCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    let {product} = getState();
    const index = _.findIndex(product.cart, i => i.id == data.id);
    let temp = [];
    if (index < 0) {
      temp = _.concat(product.cart, {amount: 1, ...data});
    } else {
      temp = product.cart.map(item => {
        if (item.id == data.id) return {...item, amount: item.amount + 1};
        return item;
      });
    }
    dispatch(setProduct({...product, cart: temp}));
  };

export const changeSizeProductFromCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const temp = product.cart.map(item => {
      const t = {...item};
      if (item.id == data.id && item.selectedSize != data.selectedSize) {
        t.selectedSize = data.selectedSize;
      }
      return t;
    });
    dispatch(setProduct({...product, cart: temp}));
  };

export const changeAmountItemCart =
  (productId: string, amountChange: number): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    const index = _.findIndex(cart, i => i.id == productId);
    if (index > -1 && cart[index].amount + amountChange > 0) {
      let temp = cart.map(item => {
        const amount = item.amount + amountChange;
        if (item.id == productId) {
          return {...item, amount};
        }
        return item;
      });
      dispatch(setProduct({...product, cart: temp}));
    }
  };

export const triggerSelectedItemCart =
  (productId: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    const index = _.findIndex(cart, i => i.id == productId);
    if (index > -1) {
      let temp = cart.map(item => {
        if (item.id == productId) {
          return {...item, isSelected: !item.isSelected};
        }
        return item;
      });
      dispatch(setProduct({...product, cart: temp}));
    }
  };

export const selectedAllItemCart =
  (status: boolean): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    let temp = cart.map(item => {
      return {...item, isSelected: status};
    });
    dispatch(setProduct({...product, cart: temp}));
  };

export const removeItemCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const cart = [...product.cart];
    const index = _.findIndex(cart, data);
    if (index > -1) {
      _.remove(cart, i => i.id == data.id);
      dispatch(setProduct({...product, cart}));
    }
  };

export const clearCart = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {product} = getState();
  if (!_.isEmpty(product.cart)) dispatch(setProduct({...product, cart: []}));
};

// Wishlist
export const loadWishlist = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {product} = getState();
  const wishlist = await productService.loadWishlist();
  dispatch(setProduct({...product, wishlist: wishlist}));
};

export const triggerProductToWishlist =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    let temp: Product[] = [];
    if (_.findIndex(product.wishlist, data) < 0) {
      temp = _.concat(product.wishlist, data);
    } else {
      temp = product.wishlist.map(i => i);
      _.remove(temp, i => i.id == data.id);
      console.log(temp);
    }
    productService.saveWishlist(temp);
    dispatch(setProduct({...product, wishlist: temp}));
  };

export const changeSizeProductFromWishlish =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const temp = product.wishlist.map(item => {
      const t = {...item};
      if (item.id == data.id && item.selectedSize != data.selectedSize) {
        t.selectedSize = data.selectedSize;
      }
      return t;
    });
    productService.saveWishlist(temp);
    dispatch(setProduct({...product, wishlist: temp}));
  };

export const productSelectors = {
  select: (state: RootState): Product | null => state.accounts,
};

export default Products.reducer;
