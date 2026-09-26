import { apiClient } from "@/lib/apiClient";
import { applyAsDoctorPayload } from "@/types/doctor";

export function applyAsDoctor(payload: applyAsDoctorPayload) {
  const formData = new FormData();

  formData.append("body", JSON.stringify(payload.body));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/verify", {
    method: "POST",
    body: formData,
  });
}
