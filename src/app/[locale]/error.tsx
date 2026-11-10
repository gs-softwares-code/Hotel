"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to internal edge telemetry
    console.error("Aura Edge Exception:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-slate-900">
        Sanctuary Portal Offline
      </h2>
      <p className="text-xs text-slate-500 max-w-md">
        An edge processing anomaly occurred. Our engineers have been alerted via real-time telemetry.
      </p>
      <Button onClick={() => reset()} variant="secondary" size="sm" className="text-xs uppercase tracking-wider">
        Retry Gateway Connection
      </Button>
    </div>
  );
}
