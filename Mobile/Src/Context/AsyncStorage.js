// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const get_mem = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        return value;
    }
    catch (e) {
        console.log(e)
    }
}

export const set_mem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.log(e)
    }
}

export const remove_mem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (exception) {
        return false;
    }
}

export const get_access_token = async () => {
    try {
        let value = await AsyncStorage.getItem('access_token');
        return value;
    }
    catch (e) {
        console.log(e)
    }
}

export const set_access_token = async (value) => {
    try {
        await AsyncStorage.setItem('access_token', value);
    }
    catch (e) {
        console.log(e)
    }
}

export const get_refresh_token = async () => {
    try {
        let value = await AsyncStorage.getItem('refresh_token');
        return value;
    }
    catch (e) {
        console.log(e)
    }
}

export const set_refresh_token = async (value) => {
    try {
        await AsyncStorage.setItem('refresh_token', value);
    }
    catch (e) {
        console.log(e)
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("access_token");
        return true;
    }
    catch (exception) {
        return false;
    }
}