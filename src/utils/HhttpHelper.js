import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_USER_INFO, server_url } from '../../app.json';

function createHeaderFormUserInfo(userInfo) {
    if (userInfo) {
        let { username, token, token_access } = userInfo;
        return {
            username,
            token,
            token_access,
        };
    } else {
        return {};
    }
}

export const postServer = async (server, url, data, userInfo = null) => {
    if (userInfo === null) {
        let saved = await AsyncStorage.getItem(KEY_USER_INFO);
        userInfo = JSON.parse(saved);
    }
    let headers = createHeaderFormUserInfo(userInfo);
    return axios.post(`${server}${url}`, data, { headers });
};

export const post = (url, data, userInfo = null) => {
    return postServer(server_url, url, data, userInfo)
        .then(response => {
            if (response.data) {
                if (response.data.status.error === true) {
                    setTimeout(() => {
                        Alert.alert(response.data.status.msg);
                    }, 100);
                    return null;
                }
                return response.data.data;
            }
            setTimeout(() => {
                Alert.alert("Error request to server");
            }, 100);
            return null;
        })
        .catch((error) => {
            console.error("Axios Error:", `${server_url}${url}`);
            console.error("Axios Error:", error);

            // Access specific properties for more detail
            if (error.response) {
                console.error("Server Response Data:", error.response.data);
                console.error("Server Response Status:", error.response.status);
                console.error("Server Response Headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received. Request details:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }

            setTimeout(() => {
                Alert.alert("Error request to server");
            }, 100);
            return null;
        });
};