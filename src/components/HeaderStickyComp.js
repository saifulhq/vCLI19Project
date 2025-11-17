import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import s from '../styles'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../config/data.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { mergeSelective } from '../utils/CommonHelper'
import { useNavigation } from '@react-navigation/native'

const HeaderSticky = (props) => {

    const { children } = props;
    const insets = useSafeAreaInsets();
    const navs = useNavigation();

    const _default = {
        background: 'yellow',
        padding: 10,
        buttonBackground: colors.dark,
        iconColor: colors.light
    }
    const opt = mergeSelective(_default, props);
    // const opt = { ..._default, ...{ background, buttonBackground, iconColor } }
    console.log('opt', opt);

    /**
     * header animated
     */
    const scrollY = useSharedValue(0);
    const handelScroll = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    })
    const panelAnimated = useAnimatedStyle(() => {
        let backgroundColor = interpolateColor(scrollY.value, [100, 200], ['transparent', opt.background]);
        let opacity = interpolate(scrollY.value, [0, 200], [.5, 1], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        return { backgroundColor, opacity }
    })
    const btnAnimated = useAnimatedStyle(() => {
        let opacity = interpolate(scrollY.value, [0, 200], [.5, 1]);
        let backgroundColor = interpolateColor(scrollY.value, [100, 200], [opt.buttonBackground, 'transparent']);
        return { backgroundColor }
    })

    return (
        <>
            <Animated.View style={[panelAnimated, {
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
                zIndex: 1,
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}
            >
                <View style={[s.rowBetweenCenter, s.px10, s.pb10]}>
                    <TouchableOpacity onPress={() => navs.goBack()}>
                        <Animated.View style={[s.btnCircle, btnAnimated]}>
                            <Ionicons name="arrow-back" size={25} color={opt.iconColor} />
                        </Animated.View>
                    </TouchableOpacity>
                    <View>
                        <Text>TITLE</Text>
                    </View>
                    <View style={[s.rowBetween]}>
                        <TouchableOpacity>
                            <Animated.View style={[s.btnCircle, s.mr5, btnAnimated]}>
                                <Ionicons name="cart-outline" size={25} color={opt.iconColor} />
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Animated.View style={[s.btnCircle, s.mr5, btnAnimated]}>
                                <Ionicons name="ellipsis-vertical" size={25} color={opt.iconColor} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={handelScroll}>
                {children}
            </Animated.ScrollView>
        </>
    )
}

export default HeaderSticky

const styles = StyleSheet.create({})