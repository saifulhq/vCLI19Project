import { ActivityIndicator, Dimensions, FlatList, InteractionManager, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SafeAreaView from '../components/SafeAreaView'
import s from '../styles'
import { colors } from '../config/data.json'
import { post } from '../utils/HhttpHelper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import ScrollToTopButton from '../components/ScrollToTopButton'

const ITEMS_PER_PAGE = 10;
const screenHeight = Dimensions.get('window').height;

const FlatListPaginationScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isUiLoading, setIsUiLoading] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const canTriggerEndReachedRef = useRef(false);
    const flatListRef = useRef(null);

    const fetchMoreData = useCallback(async () => {
        if (isLoadingRef.current || !hasMoreRef.current) return;

        isLoadingRef.current = true;
        setIsUiLoading(true);

        const dataToSend = { page, limit: ITEMS_PER_PAGE };

        try {
            const res = await post('/product/search-paging', dataToSend);

            if (!res || res.dataList.length === 0) {
                setHasMore(false);
                hasMoreRef.current = false;
                return;
            }

            const { page: currentPage, totalPage, dataList } = res;
            setData(prevData => [...prevData, ...dataList]);
            setPage(prevPage => prevPage + 1);

            if (currentPage >= totalPage) {
                setHasMore(false);
                hasMoreRef.current = false;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            InteractionManager.runAfterInteractions(() => {
                isLoadingRef.current = false;
                setIsUiLoading(false);
                canTriggerEndReachedRef.current = true;
            });
        }
    }, [page]);

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        const screenHeightAdjusted = screenHeight;

        if (contentHeight < screenHeightAdjusted &&
            hasMoreRef.current &&
            !isLoadingRef.current &&
            canTriggerEndReachedRef.current) {

            fetchMoreData();
        }
    };

    // on init screen
    useEffect(() => {
        fetchMoreData();
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View style={[s.bgWhite, s.mb10, s.p10, s.rn10, s.py20]}>
                <Text>Test {index}</Text>
            </View>
        )
    }

    const renderFooter = () => {
        // Tampilkan loading HANYA saat isUiLoading true
        if (isUiLoading) {
            return (
                <View style={[s.center, s.p10]}>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text>Memuat item lainnya...</Text>
                </View>
            );
        }
        // Tampilkan "Semua data dimuat" jika habis dan ada data yg ditampilkan
        if (!hasMore && data.length > 0) {
            return (
                <View style={[s.center, s.mb20, s.bgSoftLight, s.p10]}>
                    <Text style={[s.primary, s.fw6, s.textMd]}>Semua data telah dimuat...</Text>
                </View>
            )
        }
        return null;
    }

    return (
        <SafeAreaView style={[s.p10, s.bgPrimary, s.flex1]}>
            <View style={[s.row, s.mb20, s.alignCenter]}>
                <Pressable style={[s.mr10, s.btnCircle, s.btnLight]} onPress={() => navigation.goBack()}>
                    <Ionicons size={25} name="arrow-back" color={colors.primary} />
                </Pressable>
                <Text style={[s.textXxl, s.fw6, s.white]}>Sample FlatList + Pagination</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.01}
                ListFooterComponent={renderFooter}
                onContentSizeChange={handleContentSizeChange}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                    const { contentOffset } = event.nativeEvent;
                    setShowScrollToTop(contentOffset.y > 200);
                }}
                scrollEventThrottle={200} // Atur frekuensi event onScroll (ms)
            />
            <ScrollToTopButton flatListRef={flatListRef} isVisible={showScrollToTop} />
        </SafeAreaView>
    )
}

export default FlatListPaginationScreen

const styles = StyleSheet.create({})