import { apiFetch } from "./api";

export async function getUsers() {
  return apiFetch("/users");
}

export async function getUser(id) {
  return apiFetch(`/users/${id}`);
}

export async function createUser(data) {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(id, data) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id) {
  return apiFetch(`/users/${id}`, { method: "DELETE" });
}