import { ActivityIndicator, Dimensions, FlatList, InteractionManager, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SafeAreaView from '../components/SafeAreaView'
import s from '../styles'
import { post } from '../utils/HhttpHelper'

const ITEMS_PER_PAGE = 10;
const screenHeight = Dimensions.get('window').height;

const FlatListPaginationScreen = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isUiLoading, setIsUiLoading] = useState(false);

    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const canTriggerEndReachedRef = useRef(false);


    const fetchMoreData = useCallback(async () => {
        if (isLoadingRef.current || !hasMoreRef.current) return;

        isLoadingRef.current = true;
        setIsUiLoading(true);

        const dataToSend = { page, limit: ITEMS_PER_PAGE };

        try {
            const res = await post('/product/search-paging', dataToSend);

            if (res?.length) {
                setData(prevData => [...prevData, ...res]);
                setPage(prevPage => prevPage + 1);

                if (res.length < ITEMS_PER_PAGE) {
                    setHasMore(false);
                    hasMoreRef.current = false;
                }
            } else {
                setHasMore(false);
                hasMoreRef.current = false;
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            InteractionManager.runAfterInteractions(() => {
                isLoadingRef.current = false;
                setIsUiLoading(false); // Matikan UI loading

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
            return <Text style={s.endOfListText}>Semua data telah dimuat.</Text>;
        }
        return null;
    }

    return (
        <SafeAreaView style={[s.p10, s.bgPrimary, s.flex1]}>
            <View>
                <Text style={[s.textXxl, s.fw6]}>FlatList dengan Pagination</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                onContentSizeChange={handleContentSizeChange}
            />
        </SafeAreaView>
    )
}

export default FlatListPaginationScreen

const styles = StyleSheet.create({})