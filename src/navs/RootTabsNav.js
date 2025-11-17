import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeTab from './HomeTabNav';
import ProfileTab from './ProfileTabNav';
import CustomTabBar from './CustomTabBar';
import MovieTab from './MoviewTabNav';

const RootTabs = () => {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            id="MainTabsNavigator"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarStyle: (() => {
                    const result = {
                        // backgroundColor: 'transparent',
                        // position: 'absolute',
                        elevation: 0,
                    };
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'RootScreenOfTab';
                    // List screen name yg muncul bottom navigation
                    const mainScreens = ['RootScreenOfTab', 'ProfileScreen', 'HomeScreen', 'MovieScreen'];
                    if (mainScreens.includes(routeName)) {
                        result.display = 'flex';
                        return result;
                        // return { display: 'flex' }; // Tampilkan tab bar
                    }
                    return { display: 'none' }; // Sembunyikan tab bar untuk selain mainScreens
                })(),
                sceneContainerStyle: {
                    backgroundColor: 'red',
                },
                contentStyle: {
                    backgroundColor: 'yellow',
                },
            })}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name='HomeTab'
                component={HomeTab}
                options={{
                    tabBarLabel: "Dasboards",
                    title: "Homepage",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='MovieTab'
                component={MovieTab}
                options={{
                    tabBarLabel: "Movies",
                    title: "Movie Catalog",
                    tabBarIcon: ({ color, size }) => {
                        return (<Ionicons name="film-outline" color={color} size={size} />)
                    }
                }}
            />
            <Tabs.Screen
                name='ProfileTab'
                component={ProfileTab}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => <AntDesign name="setting" color={color} size={size} />
                }}
            />
        </Tabs.Navigator>
    )
}

export default RootTabs;