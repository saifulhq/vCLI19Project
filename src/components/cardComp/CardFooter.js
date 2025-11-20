import React from 'react'

import { StyleSheet, View } from 'react-native'
import { card } from '../../config/data.json';
import s from '../../styles';

const CardFooter = (props) => {

    const { children, style, ...otherProps } = props;
    const compStyles = [s.p10, s.rnb10, s.right, styles.container];

    // Merge custom styles if provided
    if (style) {
        compStyles.push(style);
    }

    return (
        <View style={compStyles} {...otherProps}>
            {children}
        </View>
    )
}

export default CardFooter;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card.footerColor,
    }
})