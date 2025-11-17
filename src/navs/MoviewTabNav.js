import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from '../pages/MoviesScreen';

const MovieTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MovieScreen" component={MoviesScreen}
                options={{
                    title: 'Movie Catalog'
                }} />
        </Stack.Navigator>
    )
}

export default MovieTab