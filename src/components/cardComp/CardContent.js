import React from 'react'

import { StyleSheet, View } from 'react-native'
import { card } from '../../config/data.json';
import s from '../../styles';

const CardContent = (props) => {

    const { children, style, hasFooter, ...otherProps } = props;
    const compStyles = [s.p10, styles.container];

    if (!hasFooter) compStyles.push(s.rnb10);

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

export default CardContent

const styles = StyleSheet.create({
    container: {
        backgroundColor: card.contentColor
    }
})