const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.err || data.error || "Request failed");
  }

  return data;
}
