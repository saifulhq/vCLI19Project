import React, { useEffect, useRef } from 'react'

import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { card, colors } from '../../config/data.json';
import s from '../../styles';

const CardTitle = (props) => {

    const { title, children, style, textStyle, accordion, expanded, onPress, ...otherProps } = props;
    const compStyles = [s.p10, s.rnt10, styles.container];
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });
    const rotateTiming = (toValue) => Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
    })

    useEffect(() => {
        // Animasikan panah setiap kali status 'expanded' berubah
        rotateTiming(expanded ? 1 : 0).start();
    }, [expanded]);

    const renderChildren = () => {
        if (children) {
            return (<View>{children}</View>)
        } else {
            const _textStyle = [s.fs15, s.fw5, styles.titleText];
            if (textStyle) _textStyle.push(textStyle);
            return (<Text style={_textStyle}>{title || ''}</Text>)
        }
    }

    const toggleAccordion = () => {
        if (!accordion) return;
        rotateTiming(expanded ? 0 : 1).start();
        if (onPress) onPress();
    };

    // Merge custom styles if provided
    if (style) {
        compStyles.push(style);
    }

    const renderAccordion = () => {
        return (
            // <View style={{
            //     width: 20,
            //     height: 20
            // }}>
            <Animated.View style={{ transform: [{ rotateZ: rotate }] }}>
                <FontAwesome name="chevron-right" size={15} color={colors.primary} />
            </Animated.View>
            // </View>
        )
    }

    return (
        <View style={compStyles} {...otherProps}>
            <TouchableOpacity style={[s.rowBetween, s.alignCenter]} onPress={() => toggleAccordion()} >
                {renderChildren()}
                {accordion ? renderAccordion() : (<></>)}
            </TouchableOpacity>
        </View>
    )
}

export default CardTitle

const styles = StyleSheet.create({
    container: {
        backgroundColor: card.headerColor,
        position: 'relative'
    },
    titleText: {
        color: colors.primary
    }
})