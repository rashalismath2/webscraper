import {
  ADD_PRODUCT_TO_HISTORY,
  UPDATE_PRODUCT_DETAILS,
  UPDATE_PRODUCT_WITH_TRACK_STATUS
} from "./history.actions";

const initialState = {
  products: []
};

function historyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_HISTORY:
      if (state.products.find(p => p.id == action.payload.id) != null) {
        return state
      }
      return { ...state, products: [...state.products, action.payload] };

    case UPDATE_PRODUCT_DETAILS:
      var productToBeUpdated = state.products.find(p => p.id == action.payload.id)
      productToBeUpdated[action.payload.property] = action.payload.data

      var updatedProducts = state.products.map(p => {
        if (p.id == action.payload.id) {
          p = productToBeUpdated
        }
        return p
      })
      return { ...state, products: updatedProducts };

    case UPDATE_PRODUCT_WITH_TRACK_STATUS:
      var productToBeUpdated = state.products.find(p => p.id == action.payload.id)
      productToBeUpdated.tracking={
        status:action.payload.status
      }

      var updatedProducts = state.products.map(p => {
        if (p.id == action.payload.id) {
          p = productToBeUpdated
        }
        return p
      })
      return { ...state, products: updatedProducts };
    default:
      return state;
  }
}

export default historyReducer;