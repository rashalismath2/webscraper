import React from "react"

import {
    SafeAreaView,
    StyleSheet
} from 'react-native';

export default function AppContainer({children}) {

    return (
        <SafeAreaView style={styles.mainContainer}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop:10
    }
});