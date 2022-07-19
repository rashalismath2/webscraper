import { store } from '../redux/store'
import { httpGet } from '../utils/http';
import { DOMParser as Parser } from 'react-native-html-parser';
import allActions from '../redux/allActions';
import * as Notifications from 'expo-notifications'

export default async function backgroundSync() {
    const state = store.getState()
    const products = state.history.products

    var updateAvailable = false
    for (const product of products) {
        if (product.tracking != null) {
            try {
                var res = await httpGet(product.productUrl)
                res = res.data

                var parser = new Parser();
                var document = parser.parseFromString(res, "text/html");

                var xpaths = product.website.xpaths

                var pricePath = xpaths.price.cssSelector
                var price = document.querySelect(pricePath)[0].textContent

                var qtyPath = xpaths.qty.cssSelector
                var qty = document.querySelect(qtyPath)[1].textContent

                if (product.qty != qty || product.price != price) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: `Price aleart - ${product.title}`,
                            body: `${product.price} -> ${price}`,
                        },
                        trigger: { seconds: 1 },
                    });
                    updateAvailable = true
                }
                store.dispatch(allActions.history.updateProductDetail({
                    id: product.id,
                    data: price,
                    property: 'price'
                }))
                store.dispatch(allActions.history.updateProductDetail({
                    id: product.id,
                    data: qty,
                    property: 'qty'
                }))
                store.dispatch(allActions.history.updateProductDetail({
                    id: product.id,
                    data: new Date(),
                    property: 'createdAt'
                }))
            } catch (error) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Price update`,
                        body: `${error.message}`,
                    },
                    trigger: { seconds: 1 },
                });
            }
        }
    };
    if (updateAvailable == false) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Price update`,
                body: `Seems like you have no updates.!`,
            },
            trigger: { seconds: 1 },
        });
    }
}


