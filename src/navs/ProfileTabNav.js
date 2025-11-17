import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../pages/ProfilePage';
import NotificationScreen from '../pages/NotificationPage';
import { TransitionSpecs } from '@react-navigation/stack';

const ProfileTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerShown: false,
            }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        </Stack.Navigator>
    )
}

export default ProfileTab