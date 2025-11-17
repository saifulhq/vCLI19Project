import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import s from '../styles';
import { post } from '../utils/HhttpHelper';
import { currencyFormat, numberFormat } from '../utils/NumberFormat';
import cfg from '../../app.json';
import { colors } from '../config/data.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../components/cardComp/Card';
import CardTitle from '../components/cardComp/CardTitle';
import CardContent from '../components/cardComp/CardContent';
import CardFooter from '../components/cardComp/CardFooter';
import MenuScroll from '../components/MenuScroll';
import SafeAreaView from '../components/SafeAreaView';
import SpaceTabBar from '../components/SpaceTabBar';

const HomeScreen = props => {
  const { navigation } = props;
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const navs = useNavigation();

  const menusConfig = [
    {
      type: 'primary',
      icon: (
        <FontAwesome name="mobile-phone" color={colors.primary} size={35} />
      ),
      text: 'Pulsa',
      onPress: () => {
        console.log('pulsa clieck');
      },
    },
    {
      type: 'success',
      icon: <FontAwesome name="film" color={colors.success} size={30} />,
      text: 'Film',
      onPress: () => {
        console.log('film clieck');
      },
    },
    {
      type: 'secondary',
      icon: <FontAwesome name="plane" color={colors.secondary} size={30} />,
      text: 'Travel',
      onPress: () => {
        console.log('travel clieck');
      },
    },
    {
      type: 'info',
      icon: <FontAwesome name="cutlery" color={colors.info} size={30} />,
      text: 'Kuliner',
      onPress: () => {
        console.log('Kuliner clieck');
      },
    },
    {
      type: 'warning',
      icon: <FontAwesome name="laptop" color={colors.warning} size={30} />,
      text: 'Elektronik',
      onPress: () => {
        console.log('Elektronik clieck');
      },
    },
    {
      type: 'danger',
      icon: <FontAwesome name="dollar" color={colors.danger} size={30} />,
      text: 'Valas',
      onPress: () => {
        console.log('Valas clieck');
      },
    },
    {
      type: 'light',
      icon: <FontAwesome name="car" color={colors.dark} size={30} />,
      text: 'Mobil',
      onPress: () => {
        console.log('Valas clieck');
      },
    },
  ];

  const search = async () => {
    const data = {
      keyword,
      paging: {
        page: 1,
        limit: 10,
      },
    };
    try {
      const res = await post('/product/search', data);
      if (res) {
        setProducts(res);
      }
    } catch (e) {
      console.trace(e);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[s.p5, { width: '50%' }]}
        onPress={() => {
          navs.push('DetailScreen');
        }}
      >
        <View
          style={[
            s.b1,
            s.rnMd,
            {
              borderColor: '#E1E000',
              backgroundColor: 'white',
            },
          ]}
        >
          <View style={[s.rnMd, { height: 120 }]}>
            <Image
              key={`image-${item.id}`}
              source={{
                uri: `${cfg.image_url}${item.images[0]}`,
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={s.p5}>
            <Text style={[s.py3, s.fs16]}>{item.name}</Text>
            <Text
              style={[s.fs13, s.pb5]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.desc}
            </Text>
            <View style={[s.rowBetween]}>
              <Text style={[s.fs15, s.fw6]}>{currencyFormat(item.price)}</Text>
              <Text style={[s.fw3, s.italic, { color: 'gray' }]}>
                stock {numberFormat(item.stock)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[s.container, {}]}>
      <ScrollView>
        <View style={[s.rowBetween, s.p10, { backgroundColor: '#d3e3fd' }]}>
          <TouchableOpacity
            onPress={() => navigation.getParent('LeftDrawer').openDrawer()}
          >
            <Ionicons name="menu" size={25} color={colors.primary} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 600 }}>Header</Text>
          <TouchableOpacity
            onPress={() => navigation.getParent('RightDrawer').openDrawer()}
          >
            <FontAwesome name="comments" size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card accordion={true} open={true}>
          <CardTitle title="Menu menarik untuk kamu!" />
          <CardContent>
            <MenuScroll data={menusConfig} />
          </CardContent>
          <CardFooter>
            <Text style={[s.fs11, s.italic]}>Copy Right by SHQ</Text>
          </CardFooter>
        </Card>

        <View style={s.p10}>
          <Text style={s.h2}>Hot Produk</Text>
          <View>
            <FlatList
              scrollEnabled={false}
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          </View>
        </View>
        <SpaceTabBar />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
