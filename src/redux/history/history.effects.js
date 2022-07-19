import {
  addProductToHistoryAction, updateProductWithTrackingStatusAction, updateProductDetailAction
} from "./history.actions";

export const addProductToHistory = (payload) => {
  return async dispatch => {
    dispatch(addProductToHistoryAction(payload));
  };
};
export const updateProductDetail = (payload) => {
  return async dispatch => {
    dispatch(updateProductDetailAction(payload));
  };
};


export const trackProduct = (payload) => {
  return async dispatch => {
    dispatch(updateProductWithTrackingStatusAction(payload));
  };
};