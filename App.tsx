import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import useCustomTheme from './src/utils/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DBInitWrapper from './src/components/DBInitWrapper';

const Stack = createNativeStackNavigator();

export default function App() {
    const { theme } = useCustomTheme();
    const screenOptions = {
        headerShown: false,
        statusBarBackgroundColor: theme.colors.background,
        statusBarStyle: theme.dark ? "light" : "dark"
    } as const

    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <NavigationContainer>
                    <DBInitWrapper>
                        <Stack.Navigator screenOptions={screenOptions}>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} />
                            <Stack.Screen name="AddEditScreen" component={AddEditScreen} />
                        </Stack.Navigator>
                    </DBInitWrapper>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
}