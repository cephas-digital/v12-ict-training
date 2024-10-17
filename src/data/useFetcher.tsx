import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { SetAuthToken, TOKEN } from "./Config";
import useAuthStore from "./stores/authStore";
import useErrorStore from "./stores/errorStore";

export const apiMethodType = [
	"get",
	"post",
	"put",
	"patch",
	"file",
	"delete",
] as const;

export type APIMETHODTYPE = (typeof apiMethodType)[number];

type apiCalType = {
	type: APIMETHODTYPE;
	url: string;
	headers?: object | any;
	data?: object | any;
	noToast?: string | boolean;
	getter?: any;
};

export type errArr = {
	message: string;
	path?: string;
};

export type resErr = {
	message?: string;
	error?: errArr[];
};

export type apiCallResType = {
	response?: any;
	errMsg?: string | null;
	errArr?: errArr[] | null;
};

export const apiCall = async ({
	type,
	url,
	data,
	getter,
	headers,
	noToast,
}: apiCalType): Promise<apiCallResType> => {
	try {
		let res;
		if (type === "get")
			res = await axios.get(url, {
				headers: {
					...headers,
				},
			});
		if (type === "post")
			res = await axios.post(
				url,
				{ ...data },
				{
					headers: {
						...headers,
					},
				}
			);
		if (type === "put")
			res = await axios.put(
				url,
				{ ...data },
				{
					headers: {
						...headers,
					},
				}
			);
		if (type === "patch")
			res = await axios.patch(
				url,
				{ ...data },
				{
					headers: {
						...headers,
					},
				}
			);
		if (type === "delete")
			res = await axios.delete(url, {
				headers: {
					...headers,
				},
			});
		if (type === "file") {
			res = await axios.post(
				`/api/v1/file`,
				{ ...data },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		}

		let response = res?.data;
		if (!["file", "get", "patch"]?.includes(type))
			if (!noToast) toast.success(res?.data?.message);
		if (getter) getter(response);
		return { response };
	} catch (error) {
		let message = "Unknown Error";
		if (error instanceof Error) message = error.message;
		if (isAxiosError(error)) {
			if (error) console.log({ error: error?.response?.data, err: error });
			if (error?.response?.status === 429) toast.error(error?.response?.data);
			const err = error as AxiosError;
			if (err?.response?.data) {
				if ((type && type !== "get") || (type && type === "get" && noToast)) {
					let { error: errors }: resErr = err?.response?.data;
					if (errors && errors?.length > 1) {
						return { errArr: errors };
					} else {
						let errMsg =
							error?.response?.data?.message ||
							error?.response?.data?.error?.[0]?.message ||
							error?.response?.data?.error?.[0]?.msg ||
							error?.message;

						if (errMsg === "Invalid Authentication, Unauthorized User") {
							localStorage.clear();
							window.location.reload();
						} else return { errMsg };
					}
				}
				return { errMsg: "" };
			}
			return { errMsg: "" };
		} else {
			return { errMsg: message };
		}
	}
};

export let numberWithCommas = (x?: string) => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
};

const useGenFetcher = () => {
	let { getErrorText, clearErrors } = useErrorStore(),
		{ getUser, getUserFail, getUserLoading } = useAuthStore(),
		loadUser = async () => {
			let token = localStorage.getItem(TOKEN);
			if (token) SetAuthToken(token);

			getUserLoading();
			clearErrors();
			try {
				let res = await axios.get(`/api/v1/user`);
				// console.log({ res: res?.data });
				if (res?.data?.data) {
					getUser(res.data);
				} else {
					getUserFail();
					getErrorText("Unauthorized User, Access denied");
				}
			} catch (err) {
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				getUserFail();
				getErrorText(
					err?.response?.data?.message ||
						err?.response?.data?.error?.[0]?.message ||
						""
				);
			}
		};
	return { loadUser };
};

export default useGenFetcher;
