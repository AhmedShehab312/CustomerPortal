import * as axios from "axios";
import Configs from "../config/config";
import { displayToast } from "../globals/globals";
import i18n from "../i18n";


const httpClient = axios.create();
httpClient.defaults.baseURL = Configs.getEndpoint;
httpClient.defaults.timeout = Configs.getTimeout;
var accessToken = "";
var refreshToken = "";
var spinnerCounter = 0;

httpClient.interceptors.response.use(
  function (response) {
    hideSpinner();
    return response.data;
  },
  function (error) {
    hideSpinner();
    if (error.response) {
      errorHandler(error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.message) {
      //error.message
      return Promise.reject(error.message);
    }
  }
);



function errorHandler(err, data) {
  // handle global error
  var errMsg = "";

  if (data.error_description) {
    if (data.error_description === "Bad credentials") {
      errMsg = i18n.t("Errors.400");
    } else errMsg = data.error_description;
  } else {
    if (err === 404) {
      errMsg = i18n.t("Errors.404");
    } else if (err === 401) {
      errMsg = i18n.t("Errors.401");
    } else {
      if (typeof data == "string") {
        errMsg = data;
      } else {
        errMsg = i18n.t("Errors.General");
      }
    }
  }
  if (err === 401) {
    window.location.href = "/quacck";
  }
  displayToast(errMsg);
}

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function setRefreshToken(token) {

  refreshToken = token;
}

export function getRefreshToken() {
  return refreshToken;
}


export function setRequestHeader(isRefresh, isLogin, url) {
  if ((accessToken === "" && isLogin) || isRefresh) {
    httpClient.defaults.headers.common["Authorization"] =
      "Basic " + btoa("web:test");
    httpClient.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded; charset=utf-8";
  }
  else {
    httpClient.defaults.headers.common["Authorization"] = "bearer " + accessToken;
    httpClient.defaults.headers.post["Content-Type"] = "application/json";
  }
}




export function HtttpGetDefult(
  url,
  serviceKey,
  showSpinner = true,
  isLogin = false,
  isRefresh = false
) {

  if (showSpinner) {
    addSpinner();
  }

  setRequestHeader(isRefresh, isLogin, url);
  return new Promise((resolve, reject) => {
    httpClient
      .get(Configs.getEndpoint + url)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  }
  );
}

export function HtttpPostDefult(
  url,
  data,
  serviceKey,
  showSpinner = true,
  isLogin = false,
  isRefresh = false

) {
  if (showSpinner) {
    addSpinner();
  }
  setRequestHeader(isRefresh, isLogin, url);
  return new Promise((resolve, reject) => {
    httpClient
      .post(Configs.getEndpoint + url, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  }
  );
}

export function HtttpDeleteDefult(
  url,
  data,
  serviceKey,
  showSpinner = true,
  isLogin = false,
  isRefresh = false

) {
  if (showSpinner) {
    addSpinner();
  }
  setRequestHeader(isRefresh, isLogin, url);
  return new Promise((resolve, reject) => {
    httpClient
      .delete(Configs.getEndpoint + url, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  }
  );
}

export function HtttpPutDefult(
  url,
  data,
  serviceKey,
  showSpinner = true,
  isLogin = false,
  isRefresh = false

) {
  if (showSpinner) {
    addSpinner();
  }
  setRequestHeader(isRefresh, isLogin, url);
  return new Promise((resolve, reject) => {
    httpClient
      .put(Configs.getEndpoint + url, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  }
  );
}

function addSpinner() {
  if (document.getElementById("spinner")) {
    spinnerCounter++;
    document.getElementById("spinner").style.display = "block";
    document.getElementById("root").classList.add("spinnerDisplayed");
  }
}

function hideSpinner() {
  spinnerCounter--;
  if (spinnerCounter <= 0 && document.getElementById("spinner")) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("root").classList.remove("spinnerDisplayed");
  }
}

export default httpClient;
