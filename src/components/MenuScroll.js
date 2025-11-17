import React from 'react'

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import s from '../styles';
import BtnComp from './BtnComp';

const MenuScroll = (props) => {

    const { type, key, data, ...otherProps } = props;
    const keyItem = `${Math.random(1000)}`;

    const renderItem = (item, index) => {
        return (
            <View key={`${key}-${keyItem}-${index}`} style={[s.flexCenter, s.mr10]}>
                <BtnComp type={item.type} style={styles.button} outline={true} icon={true} onPress={() => item.onPress()}>
                    {item.icon}
                </BtnComp>
                <Text>{item.text}</Text>
            </View>
        )
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {
                data && data.map((item, index) => renderItem(item, index))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {

    },
    button: {
        width: 60,
        height: 60
    }
})

export default MenuScroll;