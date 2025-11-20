import React, { useRef, useState } from 'react'

import { FlatList, PanResponder, StyleSheet, Text, View, Pressable, Alert, TouchableOpacity, Animated } from 'react-native'
import SafeAreaView from '../components/SafeAreaView'
import s from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ACTION_BUTTON_WIDTH = 100;
const DATA_LIST = []
for (let i = 0; i < 20; i++) {
  DATA_LIST.push({ id: `0${i + 1}`, title: `Item ke-${i + 1}` })
}

// Komponen baru untuk setiap item di dalam list
const DraggableItem = ({ item, isDragged, onDragStart, onDragEnd }) => {

  // useRef sekarang dipanggil di dalam komponen fungsional yang valid
  const translateX = useRef(new Animated.Value(0)).current;
  const isItemOpen = useRef(false); // Ref untuk melacak status item (terbuka/tertutup)

  const panResponder = useRef(PanResponder.create({
    // Hanya klaim responder jika pergerakan horizontal lebih dominan
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {
      // Saat item mulai di-drag, panggil fungsi dari parent
      onDragStart(item.id);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Jika item terbuka, gerakan dimulai dari -100. Jika tertutup, dari 0.
      const startValue = isItemOpen.current ? -ACTION_BUTTON_WIDTH : 0;
      const newDx = startValue + gestureState.dx;

      // Batasi pergerakan agar tidak melebihi batas kiri (-100) dan kanan (0)
      const dx = Math.min(0, Math.max(-ACTION_BUTTON_WIDTH, newDx));
      translateX.setValue(dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      let toValue = 0; // Nilai default (tertutup)

      // Jika item sedang terbuka, dan pengguna menggeser ke kanan untuk menutup
      if (isItemOpen.current && dx > ACTION_BUTTON_WIDTH / 4) { // Menggunakan ambang batas yang lebih kecil untuk menutup
        // Biarkan toValue tetap 0 untuk menutup
        isItemOpen.current = false;
      }
      // Jika item sedang tertutup, dan pengguna menggeser ke kiri untuk membuka
      else if (!isItemOpen.current && dx < -ACTION_BUTTON_WIDTH / 4) { // Menggunakan ambang batas yang lebih kecil untuk membuka
        toValue = -ACTION_BUTTON_WIDTH; // Set toValue untuk membuka
        isItemOpen.current = true;
      }
      // Jika tidak memenuhi kondisi di atas (klik atau geser sedikit), kembalikan ke posisi sebelumnya
      else {
        toValue = isItemOpen.current ? -ACTION_BUTTON_WIDTH : 0;
      }

      // Jalankan animasi ke posisi akhir (toValue)
      Animated.timing(translateX, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
  })).current;

  const itemStyle = [
    s.bgWhite, s.m10, s.p20, s.rn1, s.b1, s.bPrimary,
    isDragged && { backgroundColor: 'lightblue' },
    styles.itemContainer,
  ];

  return (
    <View style={[s.m10, s.rn1]}>
      {/* Kontainer untuk tombol aksi, berada di lapisan paling bawah */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDragEnd}>
          <Text style={{ color: 'white' }}>DELETE</Text>
        </TouchableOpacity>
      </View>

      {/* Kontainer untuk konten utama, berada di atas dan bisa digeser */}
      <Animated.View style={[{ transform: [{ translateX }] }, styles.itemContent]} {...panResponder.panHandlers}>
        <Text>{item.title}</Text>
      </Animated.View>
    </View>
  )
};

const FlatListDragDeleteScreen = ({ navigation }) => {

  const draggedItemId = useRef(null); // Ubah menjadi useRef
  const [dataList, setDataList] = useState(DATA_LIST);

  const setDraggedItemId = (id) => {
    draggedItemId.current = id;
  }

  const onDelete = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Anda yakin ingin menghapus item ini?',
      [
        {
          text: "Batal",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Ya, Hapus",
          onPress: () => {
            const _newList = dataList.filter(item => item.id !== draggedItemId.current);
            setDataList(_newList);
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={[s.container, s.bgWhite]}>
      <View style={[s.row, s.p10, s.alignCenter]}>
        <Pressable style={[s.mr10, s.btnCircle, s.btnLight]} onPress={() => navigation.goBack()}>
          <Ionicons size={25} name="arrow-back" />
        </Pressable>
        <Text style={[s.textXl, s.fw6]}>FlatList Drag Delete</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={dataList}
        renderItem={({ item }) => (
          <DraggableItem
            item={item}
            isDragged={draggedItemId.current === item.id}
            onDragStart={setDraggedItemId}
            onDragEnd={onDelete}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default FlatListDragDeleteScreen

const styles = StyleSheet.create({
  itemContent: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: '#007bff', // s.bPrimary
    borderRadius: 5, // s.rn1
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_BUTTON_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
})