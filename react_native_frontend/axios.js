import axios from 'axios';
import * as NavigationRoot from './src/NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './src/AsyncStorage';

export const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2NzI4OTE0LCJqdGkiOiI3NWZjODM5N2M3MDM0MGQ1YTY4MDkwOWVmY2VjN2U3MCIsInVzZXJfaWQiOjF9.FxGwGOSCN_7F14ZD2-cL7ndsCPNREPm3uWywFd6kwyo",
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