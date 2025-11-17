import React from 'react';

import { Image, StatusBar, Text, View } from 'react-native';
import s from '../styles'
import Animated, { FadeInUp } from 'react-native-reanimated';

const SplashScreen = () => {
    return (
        <View style={[s.flex1, s.bgWhite]}>
            <StatusBar style={s.light} />
            <Image style={[s.absolute, s.wFull, s.hFull]} source={require('../assets/images/background/background.png')} />

            <View style={[s.flex1, s.between, s.alignCenter, s.mtXl4]}>
                <View style={[s.center]}>
                    <Animated.Text entering={FadeInUp.duration(100).springify()}
                        style={[s.white, s.textXl4, s.fw8]}>Saiful Haqqi
                    </Animated.Text>
                    <Text style={[s.white, s.textXl, s.fw6, s.mtXl]}>Belajar itu yang penting doyan begadang</Text>
                    <Text style={[s.white, s.textXl, s.fw6]}>ada Google atau AI buat ngobrol</Text>
                    <Text style={[s.white, s.textXl, s.fw6]}>tambah kopi dan rokok sudah cukup</Text>
                </View>
                <Text style={[s.dark, s.mbXxl]}>@2025 Mengisi waktu luang</Text>
            </View>
        </View>
    );
}

export default SplashScreen;