import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { DeleteData, EditData } from "./authStore";

const LoggerStore = set => ({
	data: null,
	status: "",
	isFound: false,
	mainSearch: null,
	getSearchLogger: payload => {
		set(
			state => ({
				mainSearch:
					payload?.search === state?.search
						? payload?.data || payload
						: state?.mainSearch,
				isFound: true,
			}),
			false,
			"getSearchLogger"
		);
	},
	getSearch: payload => {
		set({ data: payload?.data || payload }, false, "getSearch");
	},
	resetLoggerSearch: () => {
		set({ search: "", mainSearch: null, isFound: null }, false, "getSearch");
	},
	getLogger: payload => {
		set({ data: payload?.data || payload }, false, "getLogger");
	},
	getDynamicLogger: (payload, prop) => {
		set({ [prop]: payload?.data || payload }, false, "getDynamicLogger");
	},
	setCurrentLogger: payload => {
		set(
			() => ({
				currentSelected: payload?._id || payload,
			}),
			false,
			"setCurrentLogger"
		);
	},
	addLogger: payload => {
		let data = payload?.data || payload;

		set(
			state => ({
				data: {
					...state?.data,
					docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
					totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
					docsTotal: state?.data?.docsTotal ? 1 + state?.data?.docsTotal : 1,
				},
				status: "added",
			}),
			false,
			"addLogger"
		);
	},
	addDynamicLogger: (payload, prop: string) => {
		let data = payload?.data || payload;
		set(
			state => ({
				[prop]: {
					...state?.[prop],
					docs: state?.[prop]?.docs ? [data, ...state?.[prop]?.docs] : [data],
					totalDocs: state?.[prop]?.totalDocs
						? 1 + state?.[prop]?.totalDocs
						: 1,
					docsTotal: state?.[prop]?.docsTotal
						? 1 + state?.[prop]?.docsTotal
						: 1,
				},
				status: "added",
			}),
			false,
			"addDynamicLogger"
		);
	},
	deleteLogger: payload => {
		let data = payload?.data || payload;
		set(
			state => ({
				data: {
					...state?.data,
					docs: DeleteData(state?.data?.docs, data),
					totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
					docsTotal: state?.data?.docsTotal ? state?.data?.docsTotal - 1 : 0,
				},
				status: "deleted",
			}),
			false,
			"deleteLogger"
		);
	},
	deleteDynamicLogger: (payload, prop) => {
		let data = payload?.data || payload;
		set(
			state => ({
				[prop]: {
					...state?.[prop],
					docs: DeleteData(state?.[prop]?.docs, data),
					totalDocs: state?.[prop]?.totalDocs
						? state?.[prop]?.totalDocs - 1
						: 0,
					docsTotal: state?.[prop]?.docsTotal
						? state?.[prop]?.docsTotal - 1
						: 0,
				},
				status: "deleted",
			}),
			false,
			"deleteDynamicLogger"
		);
	},
	updateLogger: payload => {
		let data = payload?.data || payload;
		set(
			state => ({
				data: {
					...state?.data,
					docs: EditData(state?.data?.docs, data),
				},
				status: "updated",
			}),
			false,
			"editLogger"
		);
	},
	subjectFail: () => {
		set({ status: "", isFound: null });
	},
	logoutLogger: () => {
		set({
			status: "",
			isFound: null,
			data: null,
			mainSearch: null,
			allLogger: null,
		});
	},
});

export const useRawdataStore = create(
	devtools(
		persist(LoggerStore, {
			name: "rawdata",
		})
	)
);

export const useToolsStore = create(
	devtools(
		persist(LoggerStore, {
			name: "tools",
		})
	)
);
