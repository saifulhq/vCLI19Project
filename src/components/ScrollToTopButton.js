import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors } from '../config/data.json';
import s from '../styles';

const ScrollToTopButton = ({ flatListRef, isVisible }) => {
    const scrollToTop = () => {
        if (flatListRef.current) {
            // Menggunakan scrollToOffset untuk scroll ke paling atas
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    // Tombol tidak akan dirender jika isVisible false
    if (!isVisible) {
        return null;
    }

    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
            <Pressable style={[s.btnCircle, s.btnLight, s.bPrimary]} onPress={scrollToTop}>
                <Ionicons size={25} name="arrow-up" color={colors.primary} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 10,
    },
});

export default ScrollToTopButton;