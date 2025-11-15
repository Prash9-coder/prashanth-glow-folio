// client/src/lib/api.ts
export const API_BASE = import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://prashanth-glow-folio.onrender.com";

export async function apiGet<T = any>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API Error (${res.status}): ${text || res.statusText}`);
    }

    return res.json();
}
