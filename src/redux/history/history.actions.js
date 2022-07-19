export const ADD_PRODUCT_TO_HISTORY = 'HISTORY_ADD_PRODUCT_TO_HISTORY';
export const UPDATE_PRODUCT_DETAILS = 'HISTORY_UPDATE_PRODUCT_DETAILS';
export const UPDATE_PRODUCT_WITH_TRACK_STATUS = 'HISTORY_UPDATE_PRODUCT_WITH_TRACK_STATUS';


export const addProductToHistoryAction = (payload) => ({
    type: ADD_PRODUCT_TO_HISTORY,
    payload: payload,
});
  

  // payload={
  //   id:'',
  //   property:'',
  //   data:''
  // }
export const updateProductDetailAction = (payload) => ({
    type: UPDATE_PRODUCT_DETAILS,
    payload: payload,
});
  

 // payload={
  //   id:'',
  //   status:'', //all,or given price
  // }
export const updateProductWithTrackingStatusAction = (payload) => ({
    type: UPDATE_PRODUCT_WITH_TRACK_STATUS,
    payload: payload,
});
  
