import { request } from "./api";
import * as tokenService from "./tokenService";

export async function signUp(formData) {
  const data = await request("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  tokenService.setToken(data.token);
  return data.token;
}

export async function signIn(formData) {
  const data = await request("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  tokenService.setToken(data.token);
  return data.token;
}

export function signOut() {
  tokenService.removeToken();
}
