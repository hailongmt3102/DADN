import AsyncStorage from '@react-native-community/async-storage';

export const test = () => {
    var result = {}
    let a = get_access_token().then(data => {return data})
    console.log(a)
    let sth = result.res
    console.log("hello in ", result.res )
    return sth
}

export const get_access_token = async () => {
    try {
        let value = await AsyncStorage.getItem('access_token');
        return value;
    }
    catch (e){
        console.log(e)
    }
}

export const set_access_token = async (value) => {
    try{
        await AsyncStorage.setItem('access_token', value);
    }
    catch(e){
        console.log(e)
    }
}

export const get_refresh_token = async () => {
    try {
        let value = await AsyncStorage.getItem('refresh_token');
        return value;
    }
    catch (e){
        console.log(e)
    }
}

export const set_refresh_token = async (value) => {
    try{
        await AsyncStorage.setItem('refresh_token', value);
    }
    catch(e){
        console.log(e)
    }
}