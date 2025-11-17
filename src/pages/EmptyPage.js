import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

const EmptyScreen = () => {
    const navs = useNavigation();
    const route = useRoute();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Empty Screen</Text>
        </View>
    );
};

export default EmptyScreen;