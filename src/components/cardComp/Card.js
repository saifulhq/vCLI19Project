import React, { Children, useCallback, useState } from 'react'

import { Dimensions, StyleSheet, View } from 'react-native'
import { card } from '../../config/data.json';
import s from '../../styles';
import CardFooter from './CardFooter';
import CardContent from './CardContent';
import CardTitle from './CardTitle';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { screenWidth } = Dimensions.get('window');

const Card = (props) => {

    const { children, style, open, accordion, ...otherProps } = props;

    const key = `${Math.random(100000)}`;
    const [expanded, setExpanded] = useState(!!open);
    const cardStyles = [s.b1, s.rnMd, s.m10, styles.container];
    let hasFooter = false;

    // ref element
    let titleComp = null;
    let contentChildren = [];

    const height = useSharedValue(0);
    let [measuredHeight, setmeasuredHeight] = useState(0);
    const opacity = useSharedValue(0);

    const handleLayout = useCallback((event) => {
        const measuredHeight = event.nativeEvent.layout.height;
        if (measuredHeight > 0 && height.value === 0) {
            setmeasuredHeight(measuredHeight);
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const targetHeight = expanded ? measuredHeight : 0;
        height.value = withTiming(targetHeight, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
        // Juga animasikan opacity agar fade in/out
        opacity.value = withTiming(expanded ? 1 : 0, {
            duration: 500
        });

        const result = {
            height: height.value,
            opacity: opacity.value,
        }
        return result;
    });

    const renderChildren = () => {
        return (
            <Animated.View
                style={[{ overflow: 'hidden' }, animatedStyle]}
            >
                {
                    contentChildren.map((child, index) => {
                        return (<View key={`${key}-accordion-${index}`}>{child}</View>);
                    })
                }
            </Animated.View>
        )
    }

    // check children memiliki elm footer atau tidak
    // kemudian kirim informasi ke CardContent
    Children.forEach(children, child => {
        if (child.type === CardFooter) hasFooter = true;
    })

    // deteksi children dan lakukan action berdasarkan type
    Children.map(children, child => {
        if (accordion && child.type === CardTitle) {
            titleComp = React.cloneElement(child, { accordion, expanded, setExpanded });
            return;
        }

        // jika accordion dan expanded false hanya print CardTitle
        // if (accordion && expanded === false && child.type !== CardTitle) return;

        if (child.type === CardContent) {
            contentChildren.push(React.cloneElement(child, { hasFooter }));
            return;
        }
        // return child;
        contentChildren.push(child);
    });

    // Merge custom styles if provided
    if (style) {
        cardStyles.push(style);
    }

    return (
        <View style={cardStyles}  {...otherProps}>
            {titleComp}
            {renderChildren()}

            <View style={styles.measureContainer}>
                <View onLayout={handleLayout}>
                    {
                        contentChildren.map((child, index) => {
                            return (<View key={`${key}-accordion-${index}`}>{child}</View>);
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: card.bgColor,
        borderColor: '#E1E0FF',
        position: 'relative'
    },
    measureContainer: {
        position: 'absolute', // Mengeluarkannya dari flow layout normal
        opacity: 0,           // Menyembunyikannya secara visual
        width: screenWidth - 40,
        pointerEvents: 'none', // Memastikan tidak bisa disentuh
    },
})