import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomePage';
import DashboardScreen from '../pages/DashboardPage';
import FlatListPaginationScreen from '../pages/FlatListPaginationScreen';

const HomeTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="FlatListPaginationScreen" component={FlatListPaginationScreen} />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
    )
}

export default HomeTab;