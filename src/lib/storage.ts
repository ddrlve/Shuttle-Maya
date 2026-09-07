"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS, TICKETS, type CommunityRequest, type Ticket, type TicketStatus } from "@/lib/data";

const STORAGE_EVENT = "shuttle-maya-storage";
const EMPTY_COMMUNITY_REQUESTS: CommunityRequest[] = [];
let ticketCacheRaw: string | null = null;
let ticketCacheValue: Ticket[] = TICKETS;
let communityCacheRaw: string | null = null;
let communityCacheValue: CommunityRequest[] = EMPTY_COMMUNITY_REQUESTS;

function emitStorageChange() {
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function subscribeStorage(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(STORAGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(STORAGE_EVENT, listener);
  };
}

function readTicketsSnapshot(): Ticket[] {
  if (typeof window === "undefined") return TICKETS;
  const stored = window.localStorage.getItem(STORAGE_KEYS.tickets);
  if (!stored) return TICKETS;
  if (stored === ticketCacheRaw) return ticketCacheValue;
  try {
    ticketCacheValue = JSON.parse(stored) as Ticket[];
    ticketCacheRaw = stored;
    return ticketCacheValue;
  } catch {
    return TICKETS;
  }
}

function readCommunitySnapshot(): CommunityRequest[] {
  if (typeof window === "undefined") return EMPTY_COMMUNITY_REQUESTS;
  const stored = window.localStorage.getItem(STORAGE_KEYS.communityRequests);
  if (!stored) return EMPTY_COMMUNITY_REQUESTS;
  if (stored === communityCacheRaw) return communityCacheValue;
  try {
    communityCacheValue = JSON.parse(stored) as CommunityRequest[];
    communityCacheRaw = stored;
    return communityCacheValue;
  } catch {
    return EMPTY_COMMUNITY_REQUESTS;
  }
}

export function loadTickets(): Ticket[] {
  if (typeof window === "undefined") return TICKETS;
  const stored = window.localStorage.getItem(STORAGE_KEYS.tickets);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(TICKETS));
    return TICKETS;
  }
  try {
    return JSON.parse(stored) as Ticket[];
  } catch {
    return TICKETS;
  }
}

export function saveTicket(ticket: Ticket) {
  const tickets = loadTickets();
  window.localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify([ticket, ...tickets]));
  emitStorageChange();
}

export function updateTicketStatus(id: string, status: TicketStatus) {
  const tickets = loadTickets();
  const updated = tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket));
  window.localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(updated));
  emitStorageChange();
}

export function loadCommunityRequests(): CommunityRequest[] {
  if (typeof window === "undefined") return EMPTY_COMMUNITY_REQUESTS;
  const stored = window.localStorage.getItem(STORAGE_KEYS.communityRequests);
  if (!stored) return EMPTY_COMMUNITY_REQUESTS;
  try {
    return JSON.parse(stored) as CommunityRequest[];
  } catch {
    return EMPTY_COMMUNITY_REQUESTS;
  }
}

export function saveCommunityRequest(request: CommunityRequest) {
  const requests = loadCommunityRequests();
  window.localStorage.setItem(
    STORAGE_KEYS.communityRequests,
    JSON.stringify([request, ...requests]),
  );
  emitStorageChange();
}

export function useStoredTickets() {
  return useSyncExternalStore(subscribeStorage, readTicketsSnapshot, () => TICKETS);
}

export function useCommunityRequests() {
  return useSyncExternalStore(
    subscribeStorage,
    readCommunitySnapshot,
    () => EMPTY_COMMUNITY_REQUESTS,
  );
}
