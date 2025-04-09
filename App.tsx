import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import { initDB } from './src/utils/database';
import useCustomTheme from './src/utils/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const { theme } = useCustomTheme();
  const screenOptions = {
    headerShown: false,
    statusBarBackgroundColor: theme.colors.background,
    statusBarStyle: theme.dark ? "light" : "dark"
  } as const

  useEffect(() => {
    initDB();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddEdit" component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}