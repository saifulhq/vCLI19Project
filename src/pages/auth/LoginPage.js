import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import s from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BtnComp from '../../components/BtnComp';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const LoginScreen = () => {
    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // bottom sheet
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["50%", "90%"], []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                onPress={handleCloseModalPress}
            />
        ),
        []
    );

    return (
        <SafeAreaView style={s.containerForm}>
            <Ionicons name="at-circle-outline" color="#C8C8C8" size={150} style={{ marginBottom: 20 }} />

            <Text style={{
                fontSize: 20,
                fontWeight: 600
            }}>HALLO, Ketemu Lagi</Text>
            <Text style={{
                color: 'gray'
            }}>Selamat datang kembali, silahkan masuk</Text>
            <View class style={{ height: 30 }}></View>

            <View style={styles.w_80}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={[styles.inputText]}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[styles.inputText, s.mb20]}
                />
                <BtnComp type="primary" onPress={() => signIn({ username, password })} text="Sign In" />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                enableDynamicSizing={false}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView style={[{
                    flex: 1,
                    ...s.p20,
                    ...s.pt0
                    // paddingTop: 0,
                }]}>
                    <Text style={[s.textXxl, s.fw8, s.my10, s.danger]}>Informasi Penting</Text>
                    <Text style={[s.textMd]}>
                        Aplikasi ini hanya untuk prototype yang berisikan
                        <Text style={[s.fw6, s.fs18]}> Login, Drawer, Navigation, Bottom Navigation, Tab Stack, </Text>
                        dan <Text style={[s.fw6, s.fs18]}> Stack </Text> yang berisikan Screen mandiri untuk
                        <Text style={[s.fw6, s.fs18]}> PUSH</Text>.
                    </Text>
                    <Text style={[s.textMd, s.mt10]}>
                        Dengan beberapa sample Header Animated pada beberapa page, dan custom component
                        yang sering digunakan
                    </Text>
                    <Text style={[s.textMd, s.mt10, s.italic]}>
                        NB: tidak menggunakan Component Lib karena ribet Custom
                    </Text>
                    <View style={[s.right, s.mt10]}>
                        <TouchableOpacity style={[s.btn]} onPress={handleCloseModalPress}>
                            <Text style={s.primary}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputText: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 5
    },
    w_80: {
        width: '80%'
    }
})

export default LoginScreen;