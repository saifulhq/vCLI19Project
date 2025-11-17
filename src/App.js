/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import SplashInitScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_USER_INFO } from '../app.json';
import SignupScreen from './pages/auth/signupPage';
import LoginScreen from './pages/auth/LoginPage';
import ForgotScreen from './pages/auth/forgotPage';
import SplashScreen from './pages/SplashScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SignIn, SignOut } from './redux/reducers/LoginSlice';
import { post } from './utils/HhttpHelper';
import { getMainNavigation } from './navs/MainNav';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const AuthContext = createContext();

export default function App() {

  // local reducer hanya untuk proses login yg berhubungan dengan token
  // global reducer (redux) akan menggunakan store yg lain
  // global store hanya akan menyimpan data user login
  const [state, dispatch] = useReducer((prevState, action) => {
    let result = {};
    switch (action.type) {
      case 'RESTORE_TOKEN':
        result = {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isSignout: false,
          isSignup: false,
          isForgot: false,
        };
        break;
      case 'SIGN_IN':
        result = {
          ...prevState,
          isLoading: false,
          isSignout: false,
          userToken: action.token,
          isSignup: false,
          isForgot: false,
        };
        break;
      case 'SIGN_OUT':
        result = {
          ...prevState,
          isLoading: false,
          isSignout: true,
          isSignup: false,
          isForgot: false,
          userToken: null,
        };
        break;
      case 'SIGN_UP':
        result = {
          ...prevState,
          isLoading: false,
          isSignout: false,
          isSignup: true,
          isForgot: false,
          userToken: null,
        };
        break;
      case 'FORGOT_PASSWORD':
        result = {
          ...prevState,
          isLoading: false,
          isSignout: false,
          isSignup: false,
          isForgot: true,
          userToken: null,
        };
        break;
    }
    return result;
  }, {
    isLoading: true,
    isSignout: false,
    isSignup: false,
    isForgot: false,
    userToken: null,
  })
  // const dispatchStore = useDispatch();

  // called first and once like constructor
  useEffect(() => {
    bootAsync();

    // splash screen
    setTimeout(() => {
      if (Platform.OS == 'android') SplashInitScreen.hide();
    }, 300);
  }, []);

  const authContext = useMemo(() => ({
    signIn: async data => {
      try {
        const res = await post('/auth/login', data);
        if (res) {
          const token = JSON.stringify(res);
          await AsyncStorage.setItem(KEY_USER_INFO, token);
          store.dispatch(SignIn(res)) // global store redux
          return dispatch({ type: 'SIGN_IN', token });
        }
      } catch (e) {
        console.trace(e);
      }
      return dispatch({ type: 'RESTORE_TOKEN' });
    },
    signOut: async () => {
      try {
        const userToken = JSON.parse(await AsyncStorage.getItem(KEY_USER_INFO));
        if (userToken?.username) {
          await post('/auth/logout');
        }
      } catch (e) {
        console.trace(e);
      } finally {
        await AsyncStorage.removeItem(KEY_USER_INFO);
        store.dispatch(SignOut()); // global store redux
        return dispatch({ type: 'SIGN_OUT' });
      }
    },
    signUp: () => dispatch({ type: 'SIGN_UP' }),
    forgotPassword: () => dispatch({ type: 'FORGOT_PASSWORD' }),
  }), []);

  const restoreToken = (token) => {
    const delay = 500;
    // timeout 500ms agar splash screen nongol dulu
    setTimeout(() => {
      return dispatch({ type: 'RESTORE_TOKEN', token });
    }, delay);
  }

  const bootAsync = async () => {
    let userToken;
    try {
      userToken = JSON.parse(await AsyncStorage.getItem(KEY_USER_INFO));
      if (userToken !== null) {
        try {
          // token tidak kosong, check ke server apakah token masih valid
          const res = await post('/auth/chcek-token', userToken);
          if (res) {
            let token = JSON.stringify(res);
            await AsyncStorage.setItem(KEY_USER_INFO, token);
            store.dispatch(SignIn(res)) // global store redux
            return restoreToken(token);
          }
        } catch (e) {
          console.trace(e);
        }
      }
    } catch (e) {
      console.trace(e);
    }

    // token kosong atau check token tidak valid, restore token untuk kembali ke halaman login
    restoreToken(null);
  }

  const Stack = createStackNavigator();
  console.log('check state', state);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={authContext}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                transitionSpec: {
                  open: { animation: 'timing', config: { duration: 400 } },
                  close: { animation: 'timing', config: { duration: 200 } },
                },
              }}
            >
              {state.isLoading ? (
                <Stack.Screen name="splash" component={SplashScreen} />
              ) : state.userToken == null ? (
                state.isSignup ?
                  (<Stack.Screen name="signup" component={SignupScreen} />)
                  : state.isForgot ?
                    (<Stack.Screen name="forgot" component={ForgotScreen} />)
                    : (<Stack.Screen name="login" component={LoginScreen} />))
                : (
                  <Stack.Group>
                    {getMainNavigation().map(screen => (
                      <Stack.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                      />
                    ))}
                  </Stack.Group>
                )}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
};
