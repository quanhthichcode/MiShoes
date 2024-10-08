import axios from "axios";
import { AppConfig, AppConfigAddress } from "../views/AppConfig";
import { store } from "../store/redux/store";
import {
  SetLoadingFalse,
  SetLoadingTrue,
} from "../app/reducer/Loading.reducer";
import { message } from "antd";

export const requestAdmin = axios.create({
  baseURL: AppConfig.apiUrl,
});
export const requestUser = axios.create({
  baseURL: AppConfig.apiUrl,
});

export const requestAdress = axios.create({
  baseURL: AppConfigAddress.apiUrl,
});

requestAdmin.interceptors.request.use((config) => {
  store.dispatch(SetLoadingTrue());
  return config;
});

requestAdmin.interceptors.response.use(
  (response) => {
    store.dispatch(SetLoadingFalse());
    return response;
  },
  (error) => {
    if (error.response != null && error.response.status === 400) {
      message.error(error.response.data.message);
    }
    if (error.response && error.response.status === 404) {
      window.location.href = "/not-found";
      return;
    }
    store.dispatch(SetLoadingFalse());
    throw error;
  }
);



requestUser.interceptors.request.use((config) => {
  store.dispatch(SetLoadingTrue());
  return config;
});

requestUser.interceptors.response.use(
  (response) => {
    store.dispatch(SetLoadingFalse());
    return response;
  },
  (error) => {
    if (error.response != null && error.response.status === 400) {
      message.error(error.response.data.message);
    }
    if (error.response && error.response.status === 404) {
      window.location.href = "/not-found";
      return;
    }
    store.dispatch(SetLoadingFalse());
    throw error;
  }
);