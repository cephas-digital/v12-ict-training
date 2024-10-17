import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { TOKEN } from "../Config";

const AuthStore = set => ({
	token: localStorage.getItem(TOKEN) || null,
	user: null,
	isAuth: false,
	loading: false,
	isRegistered: false,
	isLoggedIn: false,
	isUpdated: false,
	isPassword: null,
	userPage: "",
	profiles: null,
	login: payload => {
		// console.log({ payload });
		localStorage.setItem(TOKEN, payload?.token);
		set(
			{
				user: payload?.data || payload,
				token: payload?.token,
				isLoggedIn: true,
			},
			false,
			"login"
		);
	},
	setUser: payload => {
		set(
			state => ({
				isUpdated: true,
				user: payload?.data,
				profiles: payload?.profile || state?.profiles,
			}),
			false,
			"setUser"
		);
	},
	getUser: payload => {
		// console.log({ payload }, "isAuth");
		if (payload?.token) {
			localStorage.setItem(TOKEN, payload?.token);
		}
		set(
			{
				user: payload?.data || payload,
				profiles: payload?.profile,
				isAuth: payload?.data || payload ? true : false,
				loading: false,
			},
			false,
			"getUser"
		);
	},
	getUserFail: () => {
		set({ isAuth: false, loading: false });
	},
	getUserLoading: () => {
		set({ loading: true });
	},
	setPassword: () => {
		set({ isPassword: true });
	},
	setUserFail: () => {
		// console.log("hi here");
		set({
			isUpdated: false,
			isLoggedIn: false,
			isRegistered: false,
			isPassword: false,
		});
	},
	logout: () => {
		localStorage.removeItem(TOKEN);
		localStorage.clear();
		set(
			{
				isAuth: false,
				user: null,
				token: null,
				role: null,
			},
			false,
			"logout"
		);
	},
});

export const MergedData = (data, payload) => {
	let ids = new Set(payload.map(d => d._id));
	let updatateData = [...payload, ...data.filter(d => !ids.has(d._id))];
	return updatateData?.sort((a, b) => a?.createdAt - b?.createdAt);
};

export const EditData = (data, payload) => {
	let updatateData =
		data?.length > 0
			? data.map(item => (item._id !== payload._id ? item : payload))
			: data;
	return updatateData;
};

export const DeleteData = (data, payload) => {
	let filterItem =
		data?.length > 0 ? [...data.filter(item => item._id !== payload._id)] : [];
	return filterItem;
};

const useAuthStore = create(
	devtools(
		persist(AuthStore, {
			name: "wsh-admin-auth",
		})
	)
);

export default useAuthStore;
