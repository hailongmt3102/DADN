import axios from 'axios';
import * as NavigationRoot from './NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './AsyncStorage';
// import https from "https"
export const baseURL = 'https://192.168.1.7';

const axiosInstance = axios.create({
	// httpsAgent: new https.Agent({
	// 	rejectUnauthorized: false
	// }),
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2NzUzOTU5LCJqdGkiOiJjN2M3ZjRmZTBmNTQ0OWM5OGI5NDMzNmFkOGNhZTgxMyIsInVzZXJfaWQiOjF9.f-slkvj0FaC7xdIOZJ-w6eYlUw_gVw-VvhVnjvwjfKI",
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
		console.log(error)
		const response = error.response
		let response_status
		if (response) { response_status = response['status'] }
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