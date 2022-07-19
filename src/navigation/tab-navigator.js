import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackingsStackScreen from './trackings-navigator';
import HistoryStackScreen from './history-navigator';
import routes from './routes';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name={routes.home} component={TrackingsStackScreen} />
            <Tab.Screen name={routes.history} component={HistoryStackScreen} />
        </Tab.Navigator>
    );
}