import { View, Text, Alert } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../App';
import s from '../styles';

const SideMenusCustom = (props) => {
    const { navigation } = props;
    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={[s.p10]}>
                <Text style={[s.textXl, s.fw8]}>Halo, Saiful Haqqi</Text>
            </View>

            <DrawerItem
                label="Header Animated (Detail)"
                onPress={() => {
                    props.navigation.push("DetailScreen");
                }}
            />
            <DrawerItem
                label="Flat List Pagination"
                onPress={() => {
                    props.navigation.navigate("MainAppFlow", {
                        screen: "MainApp",
                        params: {
                            screen: 'HomeTab',
                            params: {
                                screen: 'FlatListPaginationScreen'
                            }
                        }
                    });
                }}
            />
            <DrawerItem
                label="Flat List Tab Bar (Movie)"
                onPress={() => {
                    props.navigation.navigate("MainAppFlow", {
                        screen: "MainApp",
                        params: {
                            screen: 'MovieTab'
                        }
                    });
                }}
            />
            <DrawerItem
                label="Simple Page (Profile)"
                onPress={() => {
                    props.navigation.navigate("MainAppFlow", {
                        screen: "MainApp",
                        params: {
                            screen: 'ProfileTab'
                        }
                    });
                }}
            />
            <DrawerItem
                label="Gorhom Bottom Sheet"
                onPress={() => {
                    props.navigation.navigate("MainAppFlow", {
                        screen: "MainApp",
                        params: {
                            screen: 'ProfileTab', 
                            params: {
                                screen: 'NotificationScreen'
                            }
                        }
                    });
                }}
            />
            <DrawerItem
                label="Logout"
                onPress={() => {
                    Alert.alert(
                        'Konfirmasi Logout',
                        'Anda yakin akan keluar dari aplikasi?',
                        [
                            {
                                text: "Batal",
                                onPress: () => { },
                                style: "cancel"
                            },
                            {
                                text: "Ya, Logout",
                                onPress: () => signOut()
                            }
                        ]
                    )
                }}
            />
        </DrawerContentScrollView>
    )
}

export default SideMenusCustom