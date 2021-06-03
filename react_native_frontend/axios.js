import axios from 'axios';
import * as NavigationRoot from './src/NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './src/AsyncStorage';

export const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: "",
		'Content-Type': 'application/json',
		accept: 'application/json'
	}
})
const space = () => {
	console.log("blank");
	console.log("blank");
	console.log("blank");
}
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(originalRequest)
		console.log(error.response)
		const response_status = error.response.status
		if (typeof error.response === 'undefined') {

			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (response_status == 401) {
			var test = false;
			let access_token = (axiosInstance.defaults.headers.common["Authorization"])
			get_refresh_token().then(token => {

				const resq = axiosInstance
					.post('/auth/token/refresh/', { refresh: token })

				resq.then(resp => {
					set_access_token(resp.data)
					axiosInstance.defaults.headers.common["Authorization"] = "JWT " + resp.data["access"]
					console.log(axiosInstance.defaults.headers.common["Authorization"])
				})


			})
			// return axiosInstance(originalRequest.url);
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;