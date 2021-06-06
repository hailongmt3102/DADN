import axios from 'axios';
import * as NavigationRoot from './NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './AsyncStorage';
// import https from "https"r
// const https = require('https');

export const baseURL = 'http://10.0.2.2:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2ODI1NTQ0LCJqdGkiOiIxMjIxMzU2NTJkOTI0MzQ3YWM5YjZmMmQ2YWM5Y2Q5MiIsInVzZXJfaWQiOjF9.rgX2Js8K5ChQRP4n8w2vGszKS6Em5o3aRq7l84s1JHs",
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
		console.log("oops")
		console.log("this is your err", error)
		console.log("this is your err", error.config)
		// // console.log(https)
		// const originalRequest = error.config;
		// console.log(error)
		// const response = error.response
		// let response_status
		// if (response) { response_status = response['status'] }
		// if (typeof error.response === 'undefined') {

		// 	alert(
		// 		'A server/network error occurred. ' +
		// 		'Looks like CORS might be the problem. ' +
		// 		'Sorry about this - we will get it fixed shortly.'
		// 	);
		// 	return Promise.reject(error);
		// }

		// if (response_status == 401) {
		// 	// var test = false;
		// 	// let access_token = (axiosInstance.defaults.headers.common["Authorization"])
		// 	// get_refresh_token().then(token => {
		// 	// 	const resq = axiosInstance
		// 	// 		.post('/auth/token/refresh/', { refresh: token })

		// 	// 	resq.then(resp => {
		// 	// 		set_access_token(resp.data)
		// 	// 		axiosInstance.defaults.headers.common["Authorization"] = "JWT " + resp.data["access"]
		// 	// 		console.log(axiosInstance.defaults.headers.common["Authorization"])
		// 	// 	})


		// 	// })
		// 	// // return axiosInstance(originalRequest.url);
		// 	// return Promise.reject(error);
		// }
		return Promise.reject(error);
	}
);

export default axiosInstance;