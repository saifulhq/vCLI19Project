import React from 'react';

import { SafeAreaView as _SafeAreaView_ } from 'react-native-safe-area-context';

const SafeAreaView = (props) => {
    const { children, style, ignoreBottom, ...otherProps } = props;

    // const insets = useSafeAreaInsets();
    // console.log('insets', insets)

    const container = [{
        // paddingBottom: 70,
        // paddingTop: insets.top
    }];

    if (style) {
        container.push(style);
    }

    return (
        <_SafeAreaView_ edges={['top', 'left', 'right']} style={container} {...otherProps}>
            {children}
        </_SafeAreaView_>
    )
}

export default SafeAreaView