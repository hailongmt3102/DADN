import axios from 'axios';
import * as NavigationRoot from './src/NavigationRoot';

import {get_access_token, set_access_token, get_refresh_token, set_refresh_token} from './src/AsyncStorage';

export const baseURL = 'http://localhost:8000';

const axiosInstance =  axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        // Authorization: get_access_token() ?
        //     'JWT ' + get_access_token() : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		
		if (typeof error.response === 'undefined') {
			
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}
	
		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + '/auth/token/refresh/'
		) {
			
			NavigationRoot.navigate('LoginScreen')
			return Promise.reject(error);
		}
		
		
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			
			const refreshToken = get_refresh_token();

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							set_access_token(response.data.access);
							set_refresh_token(response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					NavigationRoot.navigate('LoginScreen', {})
				}
			} else {
				console.log('Refresh token not available.');
				NavigationRoot.navigate('LoginScreen', {})
			}
		}

		NavigationRoot.navigate('LoginScreen', {})
		return Promise.reject(error);
	}
);

export default axiosInstance;