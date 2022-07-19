
import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import AppNavigator from './src/navigation/app-navigator';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store';

import * as Notifications from 'expo-notifications'

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import backgroundSync from './src/background-tasks/fetch';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import { httpGet } from './src/utils/http';

const BACKGROUND_FETCH_TASK = 'products-background-fetch';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  await backgroundSync()
  return BackgroundFetch.BackgroundFetchResult.NewData;
});




const App = () => {

  useEffect(() => {
    httpGet('http://152.67.5.251:8080/Product/Details/1').then(res=>console.log(res))
    isRegistered = TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK).then(res => {
      if (!res) {
        registerBackgroundFetchAsync();
      }
    });

  }, [])

  // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  const registerBackgroundFetchAsync = () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60*15, // 30 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <NativeBaseProvider>
            <AppNavigator />
          </NativeBaseProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};


export default App;
