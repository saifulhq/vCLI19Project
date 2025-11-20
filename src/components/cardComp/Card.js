import React, { Children, useEffect, useLayoutEffect, useState } from 'react'

import { StyleSheet, View } from 'react-native'
import { card } from '../../config/data.json';
import s from '../../styles';
import CardFooter from './CardFooter';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Card = (props) => {

    const { children, style, open, accordion, onContentHeightChange, ...otherProps } = props;

    const [expanded, setExpanded] = useState(!!open);
    const [contentHeight, setContentHeight] = useState(0);
    const [remeasureKey, setRemeasureKey] = useState(0); // State baru untuk memicu pengukuran ulang
    const cardStyles = [s.b1, s.rnMd, s.m10, styles.container];
    let hasFooter = false;

    // Helper untuk logging agar mudah diidentifikasi
    const titleForLog = Children.toArray(children).find(c => c.type === CardTitle)?.props?.title || 'Card Tanpa Judul';

    const animatedHeight = useSharedValue(open ? undefined : 0); // Inisialisasi dengan undefined jika open
    const animatedOpacity = useSharedValue(open ? 1 : 0); // Inisialisasi dengan 1 jika open

    // Efek untuk menangani status 'open' awal
    useEffect(() => {
        if (open) {
            setExpanded(true); // Pastikan status expanded adalah true jika open
        }
    }, []);

    useLayoutEffect(() => {
        console.log(`[${titleForLog}] useLayoutEffect triggered. expanded: ${expanded}, contentHeight: ${contentHeight}`);
        // Jika kartu saat ini diperluas dan contentHeight telah diukur (dan > 0),
        // perbarui animatedHeight untuk mencerminkan contentHeight yang baru.
        // Ini menangani open=true awal dan pengukuran ulang saat diperluas.
        if (expanded && contentHeight > 0) {
            animatedHeight.value = withTiming(contentHeight, { // Animate to contentHeight
                duration: 300,
                easing: Easing.inOut(Easing.ease),
            });
            animatedOpacity.value = withTiming(1, { // Pastikan opacity 1 saat expanded
                duration: 200,
                easing: Easing.inOut(Easing.ease),
            });
        } else if (!expanded) {
            // Jika tidak diperluas, pastikan tinggi adalah 0
            animatedHeight.value = withTiming(0, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
            });
            animatedOpacity.value = withTiming(0, { // Pastikan opacity 0 saat collapsed
                duration: 200,
                easing: Easing.inOut(Easing.ease),
            });
        }
    }, [contentHeight, expanded]); // Bergantung pada contentHeight dan expanded

    const toggleAccordion = () => {
        if (!accordion) return;
        const newExpanded = !expanded;
        setExpanded(newExpanded);

        if (onContentHeightChange) {
            console.log(`[${titleForLog}] -> Calling onContentHeightChange for its parent.`);
            onContentHeightChange();
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            opacity: animatedOpacity.value,
        };
    });

    // check children memiliki elm footer atau tidak
    // kemudian kirim informasi ke CardContent
    Children.forEach(children, child => {
        if (child.type === CardFooter) hasFooter = true;
    });

    // Merge custom styles if provided
    if (style) {
        cardStyles.push(style);
    }

    const content = Children.map(children, child => {
        if (child.type === CardTitle) return null; // Jangan render title di sini
        if (child.type === CardContent) {
            return React.cloneElement(child, { hasFooter });
        }
        // Ini adalah bagian penting yang hilang.
        // Jika anak adalah Card lain (akordeon bersarang), kita sisipkan callback.
        if (child.type === Card) {
            return React.cloneElement(child, {
                onContentHeightChange: () => {
                    console.log(`[${titleForLog}] Child card triggered remeasure. Remeasuring parent now.`);
                    // Ketika tinggi anak berubah, paksa induk ini untuk mengukur ulang.
                    // Beri sedikit waktu agar layout anak selesai diperbarui sebelum mengukur ulang induk.
                    setTimeout(() => {
                        setRemeasureKey(prev => prev + 1);
                        console.log(`[${titleForLog}] Parent remeasure key updated to: ${remeasureKey + 1}`);
                        if (onContentHeightChange) onContentHeightChange();
                    }, 50); // Penundaan 50ms
                }
            });
        }
        return child;
    });
    const title = Children.toArray(children).find(child => child.type === CardTitle);

    return (
        <View style={cardStyles}  {...otherProps}>
            {title && React.cloneElement(title, { accordion, expanded, onPress: toggleAccordion })}
            <Animated.View style={[styles.contentWrapper, animatedStyle]}>
                {/* Render konten yang terlihat di sini */}
                {content}
                <View
                    key={`remeasure-${remeasureKey}`} // Gunakan key di sini
                    onLayout={(event) => {
                        const measuredHeight = event.nativeEvent.layout.height;
                        console.log(`[${titleForLog}] ON LAYOUT measured height: ${measuredHeight}. Current contentHeight: ${contentHeight}`);
                        if (measuredHeight > 0 && measuredHeight !== contentHeight) { // Hanya update jika tinggi berubah dan valid
                            setContentHeight(measuredHeight);
                        }
                    }} // Tidak perlu memeriksa measuredHeight !== contentHeight di sini, setContentHeight akan memicu useEffect
                    style={{ position: 'absolute', top: 0, width: '100%', opacity: 0, zIndex: -1 }}
                >
                    {content}
                </View>
            </Animated.View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: card.bgColor,
        borderColor: '#E1E0FF',
        position: 'relative',
        overflow: 'hidden'
    },
    contentWrapper: {
        overflow: 'hidden',
    },
})