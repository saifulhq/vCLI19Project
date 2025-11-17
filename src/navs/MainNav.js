import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import RootTabs from './RootTabsNav';
import RightDrawerCustom from './RightDrawerCustom';
import SideMenusCustom from './SideMenusCustom';
import DetailScreen from '../pages/DetailPage';

const RightDrawer = createDrawerNavigator();
const RightDrawerNavigator = () => {
    return (
        <RightDrawer.Navigator
            id="RightDrawer"
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                swipeEnabled: false

            }}
            drawerContent={(props) => <RightDrawerCustom {...props} />}
        >
            <RightDrawer.Screen name="MainApp" component={RootTabs} />
        </RightDrawer.Navigator>
    );
};

const LeftDrawer = createDrawerNavigator();
const DrawerNav = () => (
    <LeftDrawer.Navigator
        id="LeftDrawer"
        screenOptions={{
            headerShown: false,
            drawerPosition: 'left',
            swipeEnabled: false
        }}
        drawerContent={props => <SideMenusCustom {...props} />}
    >
        <LeftDrawer.Screen name="MainAppFlow" component={RightDrawerNavigator} />
    </LeftDrawer.Navigator>
);

export const getMainNavigation = () => {
    // const Stack = createNativeStackNavigator();
    // return (
    //     <Stack.Group>
    //         {/* <Stack.Screen name="Main App Drawer" component={DrawerNav} /> */}

    //         {/* push screen, outside of tabs */}
    //         {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
    //     </Stack.Group>
    // )

    return [
        { name: "Main App Drawer", component: DrawerNav },
        { name: "DetailScreen", component: DetailScreen }
    ];
}

// export default MainNavigation