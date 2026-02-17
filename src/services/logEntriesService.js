import { request } from "./api";

export function getPublicEntries() {
  return request("/public/log-entries");
}

export function getMyEntries() {
  return request("/log-entries");
}

export function createEntry(payload) {
  return request("/log-entries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateEntry(id, payload) {
  return request(`/log-entries/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteEntry(id) {
  return request(`/log-entries/${id}`, {
    method: "DELETE",
  });
}
