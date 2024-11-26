import axios from "axios";

export const TOKEN = "AUTH_TOKEN";

export const SetAuthToken = (token?: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["frontend-source"] = "webuser";
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["frontend-source"];
  }
};

export const useURL = process.env.REACT_APP_BASE_URL;

// export const useURL = "https://wsh-api.geo-rolodex.com";

// export const useURL =
// 	process.env.NODE_ENV === "development"
// 		? "http://localhost:7667"
// 		: process.env.REACT_APP_BASE_URL;

export const SetDefaultHeaders = () => {
  axios.defaults.baseURL = useURL;
  axios.defaults.headers.common["frontend-source"] = "webuser";
};
