import React, { useEffect } from 'react'
import { View, FlatList, Text, Image, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import AppContainer from '../../components/container';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShop } from '@fortawesome/free-solid-svg-icons/faShop'
import { getTimeDefferent } from '../../utils/time';


export default function History() {

    const { products } = useSelector(state => state.history);

    return (
        <AppContainer>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.productContainer} key={index}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </View>
                            <View style={styles.detailesContainer}>
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <View style={styles.titleContainer}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesomeIcon size={15} color={"#a9b4b8"} icon={faShop} />
                                        <Text style={styles.websiteName}>{item.website.title}</Text>
                                    </View>
                                    <Text style={styles.addedTime}>{getTimeDefferent(new Date(),new Date(item.createdAt))}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.target}>Target : {item.tracking?item.tracking.status:'-'}</Text>
                                    <Text style={styles.price}>Price is {item.price}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </AppContainer>
    )
}


const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: "#186178",
        borderRadius: 4,
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginBottom:10
    },
    imageContainer: {
        wdith: 80
    },
    image: {
        height: 40,
        width: 80,
    },
    detailesContainer: {
        height: 70
    },
    productTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    websiteName: {
        color: "#a9b4b8",
        marginRight: 10,
        marginLeft:3
    },
    target:{
        color: "#f3ff0a",
        marginRight: 10,
    }
})