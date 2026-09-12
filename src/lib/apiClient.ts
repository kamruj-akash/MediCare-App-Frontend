import { ofetch } from "ofetch";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
export const apiClient = ofetch.create({
  baseURL: baseUrl,
  credentials: "include",
});
