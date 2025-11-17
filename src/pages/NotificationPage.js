import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const NotificationScreen = () => {
    const navs = useNavigation();

    useEffect(() => {
        // only needed for Android because
        // keyboardBehavior="extend" is not working properly
        // on Android, it leaves a gap between the keyboard and the bottom sheet
        // when the keyboard is visible
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            if (Platform.OS === 'android') {
                bottomSheetRef.current?.snapToIndex(2);
            }
        });
        return () => {
            showSubscription.remove();
        };
    }, []);

    // bottom sheet
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
    const handleSheetChanges = useCallback((index) => {
        console.log('Sheet index changed to', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
        console.log('show modal bottom sheet', bottomSheetRef.current);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'red'}}>
                <Text style={{ marginTop: 100 }}>Notification Screen</Text>
                <Button title='Back' onPress={() => {
                    navs.goBack();
                    // handlePresentModalPress();
                }} />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                enableDynamicSizing={false}
            >
                <BottomSheetView style={{
                    flex: 1,
                    // alignItems: 'center',
                    padding: 20,
                    width: 400,
                    height: 100
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}>Konten Dialog</Text>
                    <Text>Geser ke atas untuk Full Screen, atau Geser ke bawah untuk menutup.</Text>
                    <TouchableOpacity onPress={handleCloseModalPress} title="Tutup Modal" />
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

export default NotificationScreen;