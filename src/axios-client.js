import axios from "axios";
import jwtDecode from 'jwt-decode';

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

const axiosRefresh = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(async (config) => {
	let token = localStorage.getItem("ACCESS_TOKEN");

	if (token) {
		const decodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		const tokenExpiryTime = decodedToken.exp;
		const tenMinutes = 10 * 60;

		if ((tokenExpiryTime - currentTime) < tenMinutes) {
			await axiosRefresh.post('/refresh', {}, {
				headers: { Authorization: `Bearer ${token}` },
			}).then((response) => {
				const newToken = response.data.authorization.token;
				localStorage.setItem("ACCESS_TOKEN", newToken);
				token = newToken;
			}).catch((error) => {
				// Handle error, possibly logout the user
				localStorage.removeItem("ACCESS_TOKEN");
				window.location.href = '/login';
			});
		}
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;

});

// axiosClient.interceptors.response.use((response) => {
// 	return response;
// }, (error) => async () => {
// 	try {
// 		const { response } = error;
// 		//eroarea 401: daca a fost facut un request si user-ul nu este autorizat(token ul nu exista sau a expirat)
// 		if (response.status == 401) {
// 			localStorage.removeItem("ACCESS_TOKEN");
// 			//await refreshToken();
// 			window.location.href = '/login';
// 		}
// 	} catch (e) {
// 		console.log(e);
// 	}
// 	//la alte tipuri de erori doar arata eroarea
// 	throw error;
// })
export default axiosClient;