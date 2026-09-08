"use client";

import React from "react";
import QueryProviders from ".";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProviders>{children}</QueryProviders>;
}
