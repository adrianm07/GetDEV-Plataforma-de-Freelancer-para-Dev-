import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});


api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2dpbi11c2VyIiwic3ViIjoibWFyaW9AZW1haWwuY29tIiwiZXhwIjoxNzY3ODA1OTU4fQ.sA1cyjFa-2KqRHMj-npqVSP668Ar6JjV0msjdIxJF-A";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
