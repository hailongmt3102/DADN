import axios from 'axios';
import { stack_navigate } from './NavigationRoot';

import { get_access_token, set_access_token, get_refresh_token, set_refresh_token } from './AsyncStorage';
// import https from "https"r
// const https = require('https');

export const baseURL = 'http://10.0.2.2:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		// Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2ODI1NTQ0LCJqdGkiOiIxMjIxMzU2NTJkOTI0MzQ3YWM5YjZmMmQ2YWM5Y2Q5MiIsInVzZXJfaWQiOjF9.rgX2Js8K5ChQRP4n8w2vGszKS6Em5o3aRq7l84s1JHs",
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
		// console.log("oops")
		// console.log("this is your err", error.response)
		// console.log("this is your err", error.config)
		const originalRequest = error.config;
		console.log(error.config)
		const response = error.response
		console.log(error.response)
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
			let data = error.response["data"]
			// console.log(data)

			if (data["detail"]) {
				if (data["detail"] == new String("Authentication credentials were not provided.")) {
					return (get_access_token().then(
						token => {

							if (token) {

								axiosInstance.defaults.headers['Authorization'] =
									'JWT ' + token;
								originalRequest.headers['Authorization'] = axiosInstance.defaults.headers['Authorization']
								return axiosInstance(originalRequest);
							}
							else {
								stack_navigate("UserLoginScreen", {})
								return Promise.race(10);
							}

						}
					))

				} else if (data["detail"] == "Given token not valid for any token type") {
					// console.log("hello invalid token")
					if (data["messages"][0]["token_class"] == "AccessToken") {
						return get_refresh_token().then(
							token => {
								if (token) {
									return axiosInstance.post("/auth/token/refresh/", { refresh: token })
										.then(resp => resp.data)
										.then(resp_data => {
											set_access_token(resp_data.access)
											axiosInstance.defaults.headers['Authorization'] =
												'JWT ' + resp_data.access;
											originalRequest.headers['Authorization'] = axiosInstance.defaults.headers['Authorization']
											return axiosInstance(originalRequest);
										})
								}
								else {
									stack_navigate("UserLoginScreen", {})
									return Promise.race(10);
								}

							}
						)
					}
				}
				else if (data["detail"] == "Token is invalid or expired") {
					stack_navigate("UserLoginScreen", {})
					return Promise.race(10);
				}
			}


		}
		try {
			alert(error.respons.data)
		}
		catch {
			aler("something went wrong")
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;