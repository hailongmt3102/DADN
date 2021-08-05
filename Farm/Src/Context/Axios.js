import axios from 'axios';
import { stack_navigate, stack_navigation_ref } from './NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './AsyncStorage';
// import https from 'https'r
// const https = require('https');

export const baseURL = 'http://192.168.1.110:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json'
	}
})
const space = () => {
	console.log('blank');
	console.log('blank');
	console.log('blank');
}
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		// console.log('oops')
		// console.log('this is your err', error.response)
		// console.log('this is your err', error.config)
		const originalRequest = error.config;
		console.log('error config', error.config)

		const response = error.response
		console.log('error response', error.response)

		let response_status

		if (response) response_status = response['status']

		if (typeof error.response === 'undefined') {

			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);

			return Promise.reject(error);

		}

		if (response_status == 401) {
			let data = error.response.data.data
			let message = data.detail

			if (message) {
				if (message == new String('Authentication credentials were not provided.')) {

					const access_token = await get_access_token();
					if (access_token) {

						axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + access_token;

						originalRequest.headers['Authorization'] =
							axiosInstance.defaults.headers['Authorization'];

						return axiosInstance(originalRequest);
					}
				}



				else if (message == 'Given token not valid for any token type') {
					const token_class = data.messages[0].token_class;
					

					
					if (token_class == 'AccessToken') {
					
						const resfresh_token = await get_refresh_token();
					
						if (resfresh_token) {
							
							console.log(resfresh_token)

							const orgReq = await axiosInstance.post('api/user/auth/refresh', { refresh: resfresh_token })
								.then(resp => {
									return resp.data})
								.then(resp_data => {
					
									console.log('new accress',resp_data)
									
									set_access_token(resp_data.access)

									axiosInstance.defaults.headers['Authorization'] =
										'Bearer ' + resp_data.access;

									originalRequest.headers['Authorization'] = axiosInstance.defaults.headers['Authorization']

									return originalRequest
								})

							console.log(orgReq)
							return axiosInstance(orgReq);
						}
					}

				}
			}

			console.log('hello')

			while (stack_navigation_ref.current.canGoBack())
				stack_navigation_ref.current.pop()

			stack_navigate('Login', {})
			return Promise.reject({});

		}
		else {
			alert('system error');
			return Promise.reject()
		}

	}

);

export default axiosInstance;