import { View, Text, Alert } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../App';

const SideMenusCustom = (props) => {
    const { navigation } = props;
    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                <Text style={{ marginTop: 10, fontSize: 16 }}>Halo, Saiful Haqqi</Text>
            </View>

            {/* <DrawerItemList {...props} /> */}

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
                label="Profile"
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