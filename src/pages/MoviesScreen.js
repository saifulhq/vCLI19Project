import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import s from '../styles'
import { post } from '../utils/HhttpHelper';
import { image_url } from '../../app.json';
import SpaceTabBar from '../components/SpaceTabBar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../config/data.json'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SafeAreaView from '../components/SafeAreaView';

const _width_ = Dimensions.get('window').width;

const MoviesScreen = () => {

  const [categories] = useState(['Indonesia', 'Chinese', 'Korean', 'Japanise', 'Hollywpod', 'Thailand', 'Bollywood']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataList, setDataList] = useState(new Map());
  const flatListHeaderRef = useRef(null);
  const flatListContentRef = useRef(null);

  // bottom sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('Sheet index changed to', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  // end bottom sheet

  const fetchMoview = async (category) => {
    const res = await post('/movie/bycategory', { category });
    if (res) {
      setDataList(prevMap => {
        const newMap = new Map(prevMap);
        newMap.set(category, res);
        return newMap;
      });
    }
  }

  useEffect(() => {
    categories.forEach(async d => {
      fetchMoview(d);
    })
  }, [categories])

  const renderTabButton = ({ item, index }) => {
    const btnStyle = [s.px10, s.py5, s.mx5, styles.tabBtnHeader];
    if (selectedIndex === index) {
      btnStyle.push(styles.tabBtnHeaderActive);
    }
    return (
      <TouchableOpacity style={btnStyle} onPress={() => gotoFlatListItem(index)}>
        <Text style={[s.light, s.textMd, s.fw6]} >{item}</Text>
      </TouchableOpacity>
    )
  }

  const gotoFlatListItem = (index) => {
    if (flatListHeaderRef?.current) {
      flatListContentRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0
      })
    }
    if (flatListContentRef?.current) {
      flatListContentRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5
      })
    }
    setSelectedIndex(index)
  }

  const renderMovieItem = ({ item, index }) => {
    return (
      <View style={[s.w50, s.p5, s.mb5]}>
        <TouchableOpacity style={[s.b1, {
          height: 240,
          borderColor: '#F0F0F0'
        }]}
          onPress={handlePresentModalPress}
        >
          <Image source={{
            uri: `${image_url}${item.uri}`
          }} style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderTabContent = ({ item, index }) => {
    const dataView = dataList.get(item);
    if (dataView && dataView.length) {
      return (
        <FlatList
          data={dataView}
          horizontal={false}
          renderItem={renderMovieItem}
          numColumns={2}
          contentContainerStyle={{
            width: _width_,
          }}
          ListFooterComponent={<SpaceTabBar />}
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
        />
      )
    } else {
      return (
        <View style={[s.center, { width: _width_, backgroundColor: 'white', padding: 10 }]}>
          <Text style={[s.textXl, s.fw6, s.primary, s.mb20]}>Data Moview Kosong</Text>
          <View>
            <TouchableOpacity style={[s.center, s.b1, s.p10, s.rn10, s.bPrimary]}
              onPress={() => fetchMoview(item)}
            >
              <Ionicons name="refresh" size={25} color={colors.primary} />
              <Text style={[s.primary, s.pt10]}>Refresh Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'purple' }}>
      {/* <View style={[{ backgroundColor: 'red', height: 100 }]}>
        <Text>Daftar Movie</Text>
      </View> */}

      <View style={[s.py5, s.b1, styles.tabHeaderContainer]}>
        <FlatList
          ref={flatListHeaderRef}
          data={categories}
          renderItem={renderTabButton}
          keyExtractor={(item, idx) => `${idx}-${item}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          initialNumToRender={20}
        />
      </View>
      <FlatList ref={flatListContentRef}
        data={categories}
        horizontal
        renderItem={renderTabContent}
        pagingEnabled
        nestedScrollEnabled={false}
        directionalLockEnabled={true}
        initialScrollIndex={0}
        onScroll={(event) => {
          const { contentOffset, layoutMeasurement } = event.nativeEvent;
          const index = Math.round(contentOffset.x / _width_);

          if (index !== selectedIndex) {
            if (flatListHeaderRef.current) {
              flatListHeaderRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
              })
            }
            setSelectedIndex(index);
          }
        }}
        onEndReached={() => console.log("kapan dipanggil", selectedIndex)}
        onEndReachedThreshold={0.5}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={[s.flex1, s.p20, s.pt0, s.bgPrimary]}>
          <Text style={[s.fs18, s.fw6, s.mb20]}>Konten Dialog</Text>
          <Text>Geser ke atas untuk Full Screen, atau Geser ke bawah untuk menutup.</Text>
          <TouchableOpacity onPress={handleCloseModalPress}>
            <Text>Tutup Modal</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

    </SafeAreaView>
  )
}

export default MoviesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple'
  },
  tabHeaderContainer: {
    height: 45,
    backgroundColor: 'yellow',
    paddingHorizontal: 5,
  },
  tabBtnHeader: {
    backgroundColor: 'red'
  },
  tabBtnHeaderActive: {
    backgroundColor: 'blue'
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'blue',
  }
})