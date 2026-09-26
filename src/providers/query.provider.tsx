"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import QueryProviders from ".";
import { GoogleAuthProvider } from "./google-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProviders>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProviders>
    </GoogleAuthProvider>
  );
}
