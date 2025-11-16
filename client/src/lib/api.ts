// client/src/lib/api.ts
export const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://prashanth-glow-folio.onrender.com";

export async function apiGet<T = any>(path: string): Promise<T> {
    const url = `${API_BASE}${path}`;
    console.log("API GET:", url);

    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`API Error (${res.status}): ${txt}`);
    }

    return res.json();
}
