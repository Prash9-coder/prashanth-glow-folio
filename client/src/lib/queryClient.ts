import { QueryClient } from "@tanstack/react-query";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://prashanth-glow-folio.onrender.com";

// Throw helper
async function throwIfResNotOk(res: Response) {
  if (!res.ok) throw new Error(await res.text());
}

// Generic API request
export async function apiRequest(method: string, url: string, data?: any) {
  const fullUrl = API_BASE + url;

  const res = await fetch(fullUrl, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// Query function
const defaultQueryFn = async ({ queryKey }: { queryKey: readonly any[] }) => {
  const path = queryKey[0] as string; // example: "/api/projects"
  const res = await fetch(API_BASE + path);
  await throwIfResNotOk(res);
  return res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
