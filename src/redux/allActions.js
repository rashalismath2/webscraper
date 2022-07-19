import { addProductToHistory,updateProductDetail,trackProduct } from "./history/history.effects";

export default actions={
    history:{
        addProductToHistory:addProductToHistory,
        updateProductDetail:updateProductDetail,
        trackProduct:trackProduct
    }
}