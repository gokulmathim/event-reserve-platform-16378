export const API_BASE: string = (import.meta as unknown as { env: Record<string, string | undefined> }).env?.PUBLIC_API_BASE || 'http://localhost:3001';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem('token');
  } catch (_err) {
    return null;
  }
}

export function setAuthToken(token: string): void {
  try {
    localStorage.setItem('token', token);
  } catch (_err) {
    /* no-op */
  }
}

export function clearAuthToken(): void {
  try {
    localStorage.removeItem('token');
  } catch (_err) {
    /* no-op */
  }
}

// PUBLIC_INTERFACE
export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  /** Fetch helper that prefixes the API base and attaches Authorization header if available. Throws on !ok with parsed error if possible. */
  const url = `${API_BASE}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  const token = typeof window !== 'undefined' ? getAuthToken() : null;
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { message?: string; error?: string };
      message = data?.message || data?.error || message;
    } catch (_err) {
      // keep default message
    }
    throw new Error(message);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}
