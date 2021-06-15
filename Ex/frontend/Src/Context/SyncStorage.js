import SyncStorage from 'sync-storage';

SyncStorage.set('foo', 'bar');

const result = SyncStorage.get('foo');
console.log(result); // 'bar'

// export const get_access_token = () => {
//     return SyncStorage.get('access_token');
// }

// export const set_access_token =  (value) => {
//     SyncStorage.set('access_token', value);
// }

// export const get_refresh_token = () => {
//     return SyncStorage.get('refresh_token');
// }

// export const set_refresh_token = async (value) => {
//     SyncStorage.set('refresh_token', value);
// }