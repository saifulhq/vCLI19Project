import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { post } from '../utils/HhttpHelper';
import { image_url } from '../../app.json';
import s from '../styles';
import { currencyFormat } from '../utils/NumberFormat';
import HeaderSticky from '../components/HeaderStickyComp';

const DetailScreen = () => {
    const route = useRoute();
    const { params } = route;
    const [item, setItem] = useState(null);

    let itemId = params?.itemId || "sdajkqwneoadnqowe01-01AQRF";

    const getProduct = async (id) => {
        const res = await post('/product/get', { id });
        if (res) {
            setItem(res);
        }
    }

    useEffect(() => {
        getProduct(itemId);
    }, [])

    const renderItem = () => {
        return (
            <View>
                <View>
                    <Image source={{ uri: `${image_url}${item.images[0]}` }} style={{
                        height: 300,
                        resizeMode: 'contain'
                    }} />
                </View>
                <View style={[s.p10]} className="px-5 py-3">
                    <View style={[s.rowBetweenCenter]} className='flex-row justify-between items-center'>
                        <View style={[s.rowBetweenCenter]} className='flex-row'>
                            <Text style={[s.textLgl, s.danger]} className='text-xl'>Rp.</Text>
                            <Text style={[s.textXxl, s.fw6, s.danger]} className='text-2xl'>{currencyFormat(item.price, { symbol: false })}</Text>
                        </View>
                        <View className='flex-row'>
                            <Text style={[s.textSm]}>Stock {item.stock}</Text>
                        </View>
                    </View>

                    <Text style={[s.mt5, s.rowCenter]}>
                        <Text style={[, s.textMd, s.fw5]}>{item.name} </Text>
                        <Text>[Pad Only, Pad Keyboard, Pad Caching, Full Pack]</Text>
                    </Text>

                    <Text style={[s.mt5]} className='text-md'>{item.desc}</Text>
                    <Text style={[s.mt5]} className='text-md'>{item.desc}</Text>
                    <Text style={[s.mt5]} className='text-md'>{item.desc}</Text>
                    <Text style={[s.mt5]} className='text-md'>{item.desc}</Text>
                    <Text style={[s.mt5]} className='text-md'>{item.desc}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[s.container]}>
            <HeaderSticky
                background='red'
                padding={20}
                buttonBackground="tomato"
            >
                {item && renderItem()}
            </HeaderSticky>
        </View>
    );
}

export default DetailScreen;