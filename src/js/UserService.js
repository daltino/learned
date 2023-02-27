import axios from "axios";
import config from "../../config/config";
import { requestAPI } from "./LearnedAPI";
import { bitePath } from "./APIpaths";

export function getUserAccount(accessToken) {
  return axios
    .get(`${config.APIUrl}/account`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => response.data);
}

export function completeCurrentBite(params) {
  const path = `${bitePath(params)}/complete-action`;
  return requestAPI(path, "POST");
}

export function uncompleteCurrentBite(params) {
  const path = `${bitePath(params)}/uncomplete-action`;
  return requestAPI(path, "POST");
}

export function sendRating(params, rate) {
  const path = `${bitePath(params)}/rate`;
  return requestAPI(path, "PUT", { rate });
}

export function markOpenBite(params) {
  const path = `${bitePath(params)}/open-action`;
  return requestAPI(path, "POST");
}
