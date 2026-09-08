import { ofetch } from "ofetch";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const apiClient = ofetch.create({
  baseURL: baseUrl,
});
