import { Button, useToast, Actionsheet, Box, Text as BaseText } from "native-base";
import React, { useRef, useState } from "react"
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { WebView } from 'react-native-webview'
import allActions from "../../redux/allActions";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRotateForward } from '@fortawesome/free-solid-svg-icons/faArrowRotateForward'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons/faArrowLeftLong'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus'
import Toaster from "../../components/toaster";

export default Browser = ({ route }) => {

    const website = route.params;
    const webView = useRef(null);

    const [currentUrl, setCurrentUrl] = useState("")
    const [showProductLoading, setShowProductLoading] = useState(false)
    const [actionSheetOpened, setActionSheetOpened] = useState(false)

    const dispatch = useDispatch();

    const toast = useToast();

    handleWebViewNavigationStateChange = (newNavState) => {
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        setCurrentUrl(newNavState.url)
        if (currentUrl.includes(website.productPageAddress)) {
            setShowProductLoading(true)
            getProductDetails()
        }
    }

    getProductDetails = () => {
        var xpaths = website.xpaths

        var jsToRun = ``

        var pricePath = xpaths.price.path
        var priceEvaluate = `var priceEvaluate=document.evaluate('${pricePath}', document.body, null, XPathResult.STRING_TYPE, null).stringValue;`
        jsToRun = jsToRun + priceEvaluate

        var productTitlePath = xpaths.productTitle.path
        var productTitleEvaluate = `var productTitleEvaluate=document.evaluate('${productTitlePath}', document.body, null, XPathResult.STRING_TYPE, null).stringValue;`
        jsToRun = jsToRun + productTitleEvaluate

        var productImagePath = xpaths.productImage.path
        var productImageEvaluate = `var productImageEvaluate=document.evaluate('${productImagePath}', document.body, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext().currentSrc;`
        jsToRun = jsToRun + productImageEvaluate


        var productQtyPath = xpaths.qty.path
        var productQtyEvaluate = `var productQtyEvaluate=document.evaluate('${productQtyPath}', document.body, null, XPathResult.STRING_TYPE, null).stringValue;`
        jsToRun = jsToRun + productQtyEvaluate


        jsToRun = jsToRun + `window.ReactNativeWebView.postMessage(JSON.stringify({'qty':productQtyEvaluate,'image':productImageEvaluate,'title':productTitleEvaluate,'price':priceEvaluate}));`

        webView.current.injectJavaScript(jsToRun);
    }

    saveProcutDetais = (data) => {
        var parsedData = JSON.parse(data)
        parsedData.createdAt = new Date()
        parsedData.productUrl = currentUrl,
        parsedData.id = currentUrl.split('?')[0]
        parsedData.website = website
        parsedData.tracking = null
        dispatch(allActions.history.addProductToHistory(parsedData))

        setShowProductLoading(false)
    }


    trackThisProduct = () => {
        dispatch(allActions.history.trackProduct({
            id: currentUrl.split('?')[0],
            status: 'all'
        }))
        setActionSheetOpened(false)
        toast.show({
            render: () => {
                return <Toaster message={"Product was added to be tracked!"} />
            }
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.browserHeader}>
                <Text>{currentUrl}</Text>
            </View>
            <WebView
                ref={webView}
                source={{ uri: website.homeAddress }}
                onNavigationStateChange={handleWebViewNavigationStateChange}
                onMessage={(event) => {
                    saveProcutDetais(event.nativeEvent.data)
                }}
            />
            <View style={styles.browserFooter}>
                <Button
                    variant="ghost"
                    style={{ height: 30, width: 50 }}
                    fontSize={6}
                    padding={0}
                    leftIcon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                    onPress={() => {
                        webView?.current?.goBack();
                    }}
                ></Button>
                <Button
                    variant="ghost"
                    style={{ height: 30, width: 50 }}
                    fontSize={6}
                    padding={0}
                    leftIcon={<FontAwesomeIcon icon={faArrowRotateForward} />}
                    onPress={() => {
                        webView?.current?.reload();
                    }}
                ></Button>

                {currentUrl.includes(website.productPageAddress) ? <Button
                    style={{ height: 30, width: 50 }}
                    fontSize={6}
                    padding={0}
                    isLoading={showProductLoading} isLoadingText="Scraping"
                    onPress={() => { setActionSheetOpened(true) }}>
                    Track
                </Button> : null}
            </View>

            <Actionsheet isOpen={actionSheetOpened} onClose={() => { setActionSheetOpened(false) }}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <BaseText fontSize="16" style={{ fontWeight: "bold" }} color="black" >
                            Product details
                        </BaseText>
                    </Box>
                    <Actionsheet.Item>
                        <Button
                            onPress={() => { trackThisProduct() }}
                            leftIcon={<FontAwesomeIcon icon={faSquarePlus} />}>Add to tracking list
                        </Button>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

        </View>
    )
}

const styles = StyleSheet.create({
    browserFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    browserHeader: {
        display: "flex",
        flexDirection: "row",
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: "center"
    },
})