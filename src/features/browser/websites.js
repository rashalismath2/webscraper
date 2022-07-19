import React, { useState } from "react"
import {View,Image,Text,  TouchableNativeFeedback,StyleSheet} from 'react-native'
import AppContainer from "../../components/container"
import routes from "../../navigation/routes";

export default Websites=({navigation})=>{

    const [websites,setWebsites]=useState([
        {
            id:1,
            title:"Testing",
            homeAddress:'http://152.67.5.251:8080',
            productPageAddress:"http://152.67.5.251:8080/Product/Details",
            icon:"https://via.placeholder.com/150",
            xpaths:{
                'price':{
                    path:'//*[@id="product-details-page-cont"]/div[2]/ul/p',
                    currency:"LKR ",
                    cssSelector:'body section div ul p'
                },
                'productImage':{
                    path:'//*[@id="product-details-page-cont"]/div[1]/img',
                    cssSelector:'body section div img'
                },
                'productTitle':{
                    path:'//*[@id="product-details-page-cont"]/div[2]/ul/h2',
                    cssSelector:'body section div ul'
                },
                'qty':{
                    path:'//*[@id="product-details-page-cont"]/div[2]/form/div[3]/div[3]/p[2]',
                    cssSelector:'section div form div div p'
                }
            }
        }
    ])

    return(
        <AppContainer>
            {
                websites.map(website=>{
                    return(
                        <TouchableNativeFeedback key={website.id} onPress={()=>{navigation.navigate(routes.browser,website)}}>
                            <View style={styles.websiteContainer}>
                                <Image style={styles.websiteImage} source={{uri:website.icon}} />
                                <Text>{website.title}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    ) 
                })
            }
        </AppContainer>
    )
}


const styles=StyleSheet.create({
    websiteContainer:{
        // width:40
    },
    websiteImage:{
        width:60,
        height:60
    }
})