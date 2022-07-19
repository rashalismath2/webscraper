import { Fab, Actionsheet, AddIcon, Box, Text as BaseText, Button, SearchIcon } from "native-base";
import React, { useEffect, useReducer } from "react"
import { View, Text, StyleSheet,FlatList,Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import AppContainer from "../../components/container";
import routes from "../../navigation/routes";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShop } from '@fortawesome/free-solid-svg-icons/faShop'
import { getTimeDefferent } from '../../utils/time';

function homeState(state, action) {
  switch (action.type) {
    case 'openActionSheet':
      return {
        ...state,
        actionSheetOpened: action.payload
      }
    default:
      break;
  }
}

const initState = {
  actionSheetOpened: false
}

export default Home = ({ navigation }) => {

  const [state, setState] = useReducer(homeState, initState)
  const { actionSheetOpened } = state

  const { products } = useSelector(state => state.history);


  return (
    <AppContainer>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item, index }) => {
          if(item.tracking==null){
            return
          }
          return (
            <View style={styles.productContainer} key={index}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
              </View>
              <View style={styles.detailesContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.titleContainer}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesomeIcon size={15} color={"#a9b4b8"} icon={faShop} />
                    <Text style={styles.websiteName}>{item.website.title}</Text>
                  </View>
                  <Text style={styles.addedTime}>{getTimeDefferent(new Date(), new Date(item.createdAt))}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.target}>Target : {item.tracking ? item.tracking.status : '-'}</Text>
                  <Text style={styles.price}>Price is {item.price}</Text>
                </View>
              </View>
            </View>
          )
        }}
      />

      <Fab
        onPress={() => setState({ type: "openActionSheet", payload: true })}
        renderInPortal={false}
        shadow={2}
        icon={
          <AddIcon color="white"
            size="md" />
        }
      />
      <Actionsheet isOpen={actionSheetOpened} onClose={() => setState({ type: "openActionSheet", payload: false })}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <BaseText fontSize="16" style={{ fontWeight: "bold" }} color="black" >
              Fetch product details
            </BaseText>
          </Box>
          <Actionsheet.Item>
            <Button
              onPress={() => { navigation.navigate(routes.websitesList) }}
              leftIcon={<SearchIcon />}>Browse stores
            </Button>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </AppContainer>
  );
};


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


//TODO- use reusable component for product rendering
//TODO- use use selector for filter tracking products
