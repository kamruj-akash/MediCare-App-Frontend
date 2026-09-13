"use client";

import React from "react";
import QueryProviders from ".";
import { GoogleAuthProvider } from "./google-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProviders>{children}</QueryProviders>
    </GoogleAuthProvider>
  );
}
