import React from 'react'

import { View } from 'react-native'
import { useSelector } from 'react-redux';

const SpaceTabBar = (props) => {
    const { addHeight } = props;
    const tabBarHeight = useSelector((state) => state.TabBar.height);

    // harus ada tambahan height agar tidak terlalu mepet
    let additional = addHeight ? addHeight : 5;
    const height = tabBarHeight + additional;

    return (
        <View style={{ height }} />
    )
}

export default SpaceTabBar