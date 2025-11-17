import React, { useEffect, useState } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { tabBar as configTabBar } from '../config/data.json'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { setHeightTabBar } from '../redux/reducers/TabBarSlice';

const TabBarItem = (props) => {
    const { isFocused, options, label, onPress, tintColor, onLongPress } = props;

    /**
     * Animated focus property
     */
    const scale = useSharedValue(0);
    useEffect(() => {
        // scale.value = withTiming(isFocused ? 1.2 : 1, {
        //     duration: 300, // Durasi animasi dalam ms
        //     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        // });
        scale.value = withSpring(!!isFocused ? 1 : 0, { duration: 350 })
    }, [isFocused, scale]);
    const animatedStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3])
        const top = interpolate(scale.value, [0, 1], [0, 9])
        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return { opacity }
    })

    // button styles
    const tabButtonStyle = [styles.tabButton]; // default
    if (isFocused) tabButtonStyle.push(styles.tabActive) // active
    if (options.tabBarStyle) tabButtonStyle.push(options.tabBarStyle) // params tabBarStyle

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabButtonStyle}
        >
            <Animated.View style={[styles.tabButtonView, animatedStyle]}>
                {options.tabBarIcon && (
                    options.tabBarIcon({ focused: isFocused, color: tintColor, size: 24 })
                )}
            </Animated.View>
            <Animated.Text style={[{ color: tintColor, fontSize: 12 }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </TouchableOpacity>
    )
}

const CustomTabBar = (props) => {

    const { state, descriptors, navigation } = props;
    const dispatch = useDispatch();

    const [dimentions, setDimensions] = useState({ height: 20, width: 100 });
    const buttonWidth = dimentions.width / state.routes.length;
    const onTabBarLayout = (e) => {
        const { width, height } = e.nativeEvent.layout;
        dispatch(setHeightTabBar(Math.ceil(height)));
        setDimensions({ height, width })
    }
    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }]
        }
    })

    /**
     * Jika terdapat display none salah satu tab maka hilangkan semua bottom tab nav
     */
    let hasDisplayNone = false;
    state.routes.map(route => {
        const { options } = descriptors[route.key];
        if (options.tabBarStyle?.display == "none") {
            hasDisplayNone = true;
        }
    })
    if (hasDisplayNone) return (<></>)

    return (
        <View onLayout={onTabBarLayout} style={[styles.tabBarContainer]}>
            <Animated.View style={[{
                position: 'absolute',
                backgroundColor: configTabBar.active.background,
                borderRadius: 30,
                marginHorizontal: 12,
                height: dimentions.height - 15,
                width: buttonWidth - 25,

            }, animatedStyle]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1000 });
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const tintColor = isFocused ? (options.tabBarActiveTintColor || configTabBar.active.color) : configTabBar.default.color;

                return (
                    <TabBarItem
                        key={route.key}
                        isFocused={isFocused}
                        options={options}
                        label={label}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        tintColor={tintColor} />
                );
            })}
        </View>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: configTabBar.background,
        borderRadius: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        marginHorizontal: 60,

        position: 'absolute',
        bottom: 0,
        // height: 100
    },
    tabButton: {
        flex: 1,
        // backgroundColor: configTabBar.default.background,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 70
    },
    tabButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabActive: {
        // backgroundColor: configTabBar.active.background
    }
})