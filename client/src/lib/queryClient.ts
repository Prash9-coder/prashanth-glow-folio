import { QueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
  : "https://prashanth-glow-folio.onrender.com";

// Throw error if response is not OK
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Request failed: ${res.status} ${body}`);
  }
}

// Generic API request wrapper
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {

  const fullUrl = `${API_BASE}${url.startsWith("/") ? url : "/" + url}`;

  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// Default queryFn for React Query
const defaultQueryFn = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
  const path = queryKey[0] as string;
  const fullUrl = `${API_BASE}${path}`;
  const res = await fetch(fullUrl);
  await throwIfResNotOk(res);
  return res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
