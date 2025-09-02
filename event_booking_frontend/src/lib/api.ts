import { apiFetch } from './config';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer';
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  bannerUrl?: string;
  availableTickets?: number;
};

export type Booking = {
  id: string;
  eventId: string;
  quantity: number;
  totalPrice: number;
  status: 'confirmed' | 'canceled' | 'pending';
  createdAt: string;
  event?: EventItem;
};

// PUBLIC_INTERFACE
export async function register(payload: { name: string; email: string; password: string; role?: 'user' | 'organizer' }) {
  /** Register a new user */
  return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function login(payload: { email: string; password: string }) {
  /** Login with email/password; expects token and user */
  return apiFetch<{ token: string; user: User }>('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function me() {
  /** Get current authenticated user */
  return apiFetch<User>('/auth/me');
}

// PUBLIC_INTERFACE
export async function listEvents(query?: { q?: string }) {
  /** List events with optional search */
  const q = query?.q ? `?q=${encodeURIComponent(query.q)}` : '';
  return apiFetch<EventItem[]>(`/events${q}`);
}

// PUBLIC_INTERFACE
export async function getEvent(id: string) {
  /** Get single event by id */
  return apiFetch<EventItem>(`/events/${id}`);
}

// PUBLIC_INTERFACE
export async function bookEvent(id: string, payload: { quantity: number }) {
  /** Create a booking for an event */
  return apiFetch<Booking>(`/events/${id}/book`, { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function cancelBooking(id: string) {
  /** Cancel a booking */
  return apiFetch(`/bookings/${id}`, { method: 'DELETE' });
}

// PUBLIC_INTERFACE
export async function myProfile() {
  /** Get my profile */
  return apiFetch<User>('/users/me');
}

// PUBLIC_INTERFACE
export async function updateMyProfile(payload: Partial<Pick<User, 'name'>>) {
  /** Update my profile */
  return apiFetch<User>('/users/me', { method: 'PATCH', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function myBookings() {
  /** List my bookings */
  return apiFetch<Booking[]>('/users/me/bookings');
}

// Organizer

// PUBLIC_INTERFACE
export async function organizerCreateEvent(payload: Omit<EventItem, 'id'>) {
  /** Organizer: create event */
  return apiFetch<EventItem>('/organizer/events', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function organizerUpdateEvent(id: string, payload: Partial<EventItem>) {
  /** Organizer: update event */
  return apiFetch<EventItem>(`/organizer/events/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function organizerDeleteEvent(id: string) {
  /** Organizer: delete event */
  return apiFetch(`/organizer/events/${id}`, { method: 'DELETE' });
}

// PUBLIC_INTERFACE
export async function organizerEventBookings(id: string) {
  /** Organizer: list bookings for event */
  return apiFetch<Booking[]>(`/organizer/events/${id}/bookings`);
}

// PUBLIC_INTERFACE
export async function organizerStats() {
  /** Organizer: stats */
  return apiFetch<{ totalEvents: number; totalBookings: number; revenue: number }>('/organizer/stats');
}
