import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class AdapterService {
  requestAPI: AxiosInstance;

  constructor() {
    this.requestAPI = axios.create({
      baseURL:
        // "https://product-be-rekrutmen-nutech-dhafa.000webhostapp.com/api",
        "http://127.0.0.1:8000/api",
    });

    this.requestAPI.interceptors.request.use((config: any) =>
      this.interceptToken(config)
    );

    this.requestAPI.interceptors.response.use(
      (onFullfilled) => onFullfilled,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.removeItem("AuthStore");

            location.href = "/login";

            throw new Error(error.response.data.message);
          }

          throw new Error(error.response.data.message);
        }
        throw error;
      }
    );
  }

  interceptToken(config: AxiosRequestConfig) {
    const getAuthLs: any = localStorage.getItem("AuthStore");

    const { state: authInfo } = JSON.parse(getAuthLs);

    const token = authInfo?.access_token;

    if (token) {
      config.headers = Object.assign({}, config.headers, {
        Authorization: `Bearer ${token}`,
      });
    }

    return config;
  }

  buildFormData(formData: any, data: any, parentKey: any) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data === null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  sendGetRequest(url: string, params = {}) {
    return this.requestAPI.get(url, { params });
  }

  sendPostRequest(url: string, body = {}, params = {}) {
    return this.requestAPI.post(url, body, { params });
  }

  sendPostFormDataRequest(url: any, data: any, axiosParameters: any) {
    const formData = new FormData();
    this.buildFormData(formData, data, null);

    return this.sendPostRequest(url, formData, axiosParameters);
  }

  sendPutRequest(url: string, body = {}, params = {}) {
    return this.requestAPI.put(url, body, { params });
  }

  sendPutFormDataRequest(url: any, data: any, axiosParameters: any) {
    const formData = new FormData();
    this.buildFormData(formData, data, null);

    return this.sendPutRequest(url, formData, axiosParameters);
  }

  sendDeleteRequest(url: string, body = {}) {
    return this.requestAPI.delete(url, { data: body });
  }
}
