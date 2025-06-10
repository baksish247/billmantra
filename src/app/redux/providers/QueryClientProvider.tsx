"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
