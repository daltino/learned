import { WebAuth } from "auth0-js";
import _ from "lodash";
import config from "../../../config/config";
import { getUserAccount } from "../UserService";

const auth0 = new WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  redirectUri: config.auth0.redirectUri,
  responseType: config.auth0.responseType,
  scope: config.auth0.scope,
  audience: config.auth0.audience,
});

export function login(redirectPath = null) {
  if (redirectPath) {
    localStorage.setItem("redirect", redirectPath);
  }
  auth0.authorize();
}

export function logout(router, redirectBack = true) {
  localStorage.clear();
  // after log out a user is redirected to auth0 log in
  // if he/she wants to log in again will be redirected to the same page as previously
  // else if redirectBack is false like in a 404 page route to login page
  if (redirectBack) {
    router.go(window.location.pathname);
  } else {
    localStorage.setItem("redirect", "/");
    router.replace("/login");
  }
}

export function handleAuthentication(router) {
  auth0.parseHash((err, authResult) => {
    const redirectTo = localStorage.getItem("redirect") || "/page-not-found";
    if (err) {
      router.push({
        name: "login",
        query: {
          error: err.error,
          redirect: redirectTo,
        },
      });
    } else if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
        .then(() => {
          router.push(redirectTo);
        })
        .catch((error) => {
          router.push({
            name: "login",
            query: {
              error: error.response.status,
              redirect: redirectTo,
            },
          });
        });
    }
  });
}

// authResult doesn't have a company code which is essential to send requests to Learned API
function setSession(authResult) {
  return getUserAccount(authResult.accessToken).then((data) => {
    const companyCode = _.get(data, "companyCode");
    const employeeId = _.get(data, "id");
    const role = _.get(data, "role");

    if (!companyCode) {
      return Promise.reject(new Error("Account not verified"));
    }

    localStorage.setItem("company_code", companyCode);
    localStorage.setItem("id", employeeId);
    localStorage.setItem("role", role);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);

    return Promise.resolve();
  });
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getCompanyCode() {
  return localStorage.getItem("company_code");
}

export function getEmployeeId() {
  return localStorage.getItem("id");
}

export function getRole() {
  return localStorage.getItem("role");
}
