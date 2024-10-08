// actions/cartActions.js
import { ADD_TO_CART,REMOVE_TO_CART ,CREATE_INVOICE,REMOVE_INVOICE } from './Typeactions';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const removeToCart = (product) => ({
    type: REMOVE_TO_CART,
    payload: product,
  });
export const createInvoice = (invoice) => ({
  type: CREATE_INVOICE,
  payload: invoice,
});
export const removeInvoice = (invoice) => ({
    type: REMOVE_INVOICE,
    payload: invoice,
  });
