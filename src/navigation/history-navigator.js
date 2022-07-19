import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from '../features/history/history';
import routes from './routes';

const HistoryStackNavigator = createNativeStackNavigator();

export default function HistoryStackScreen() {
    return (
        <HistoryStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HistoryStackNavigator.Screen name={routes.history} component={History} />
        </HistoryStackNavigator.Navigator>
    );
}