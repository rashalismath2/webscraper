import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './routes';
import home from '../features/home/home';
import websites from '../features/browser/websites';

const TrackingsStackNavigator = createNativeStackNavigator();

export default function TrackingsStackScreen() {
    return (
        <TrackingsStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <TrackingsStackNavigator.Screen name={routes.home} component={home} />
            <TrackingsStackNavigator.Screen name={routes.websitesList} component={websites} />
        </TrackingsStackNavigator.Navigator>
    );
}