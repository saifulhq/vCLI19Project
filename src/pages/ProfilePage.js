import React, { useContext } from 'react';

import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../App';
import { text } from '../config/data.json';
import s from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SafeAreaView from '../components/SafeAreaView';
import { useSelector } from 'react-redux';
import SpaceTabBar from '../components/SpaceTabBar';

const ProfileScreen = (props) => {
    const { navigation } = props;
    const { signOut } = useContext(AuthContext);

    const doLogout = () => {
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
    }

    return (
        <SafeAreaView style={[s.container, styles.container, s.px20]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[s.pageTitle, s.center]}>
                    <Text style={[s.h2]}>Settings</Text>
                </View>
                <View style={[s.center, s.mb20]}>
                    <View style={styles.avatarContainer}>
                        <View style={[s.rnXxl, s.center, styles.avatarIcon, s.mt20, s.mb10]}>
                            <Image source={require('./../assets/images/icon/Avatar.png')} />
                        </View>
                        <View style={[s.btnCircle, styles.photoEdit]}>
                            <Ionicons name="pencil" size={15} color="white" />
                        </View>
                    </View>
                    <Text style={[s.h3]}>Saiful Haqqi</Text>
                    <Text style={{ color: text.light }}>@saifulhq</Text>
                </View>
                <View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Saved Message</Text>
                        <Ionicons name="chevron-forward" size={15} />
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Recent Call</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Devices</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Devices</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                        <View style={[s.rowBetweenCenter, styles.menuItem]}>
                            <Text>Notification</Text>
                            <Text><Ionicons name="chevron-forward" size={15} /></Text>
                        </View>
                    </TouchableOpacity>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Apperances</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Language</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Privacy & Security</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Storage</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Payment</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <View style={[s.rowBetweenCenter, styles.menuItem]}>
                        <Text>Keyboard</Text>
                        <Text><Ionicons name="chevron-forward" size={15} /></Text>
                    </View>
                    <View style={s.separator}></View>
                    <TouchableOpacity onPress={() => doLogout()}>
                        <View style={[s.rowBetweenCenter, styles.menuItem]}>
                            <Text>Logout</Text>
                            <Text><Ionicons name="chevron-forward" size={15} /></Text>
                        </View>
                    </TouchableOpacity>
                    <View style={s.separator}></View>
                </View>
                <SpaceTabBar />
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    cardAvatar: {
        height: 153
    },
    menuItem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
    avatarContainer: {
        position: 'relative'
    },
    avatarIcon: {
        backgroundColor: '#EAF2FF',
        width: 80,
        height: 80,
        overflow: 'hidden'
    },
    photoEdit: {
        position: 'absolute',
        bottom: 10,
        right: 0,
    }
})

export default ProfileScreen;