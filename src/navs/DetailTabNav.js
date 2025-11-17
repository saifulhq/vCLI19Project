import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../pages/DetailPage';

const DetailTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="DetailScreen" component={DetailScreen}
                options={{
                    title: 'Detail Page'
                }} />
        </Stack.Navigator>
    )
}

export default DetailTab