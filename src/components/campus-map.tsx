"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { CAMPUSES } from "@/lib/data";
import { campusName } from "@/lib/booking-context";

type Campus = (typeof CAMPUSES)[number];

type LeafletMap = {
  remove: () => void;
  fitBounds: (bounds: unknown, options?: unknown) => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => {
    bindPopup: (html: string) => void;
  };
};

type LeafletPolyline = {
  addTo: (map: LeafletMap) => unknown;
  getBounds: () => unknown;
};

type LeafletApi = {
  map: (element: HTMLElement, options?: unknown) => LeafletMap;
  tileLayer: (
    url: string,
    options?: unknown,
  ) => {
    addTo: (map: LeafletMap) => void;
  };
  marker: (latLng: [number, number], options?: unknown) => LeafletMarker;
  polyline: (latLngs: [number, number][], options?: unknown) => LeafletPolyline;
  divIcon: (options: unknown) => unknown;
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

let leafletPromise: Promise<LeafletApi> | null = null;

function campusPoint(code: string): Campus {
  return CAMPUSES.find((campus) => campus.code === code) ?? CAMPUSES[0];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadLeaflet() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }

  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (leafletPromise) {
    return leafletPromise;
  }

  leafletPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${LEAFLET_JS}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.L) resolve(window.L);
        else reject(new Error("Leaflet failed to load"));
      });

      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.async = true;

    script.onload = () => {
      if (window.L) resolve(window.L);
      else reject(new Error("Leaflet failed to load"));
    };

    script.onerror = reject;
    document.body.appendChild(script);
  });

  return leafletPromise;
}

export function CampusMap({
  origin = "dago",
  destination = "paskal",
  className = "",
}: {
  origin?: string;
  destination?: string;
  className?: string;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const [failed, setFailed] = useState(false);

  const originPoint = campusPoint(origin);
  const destinationPoint = campusPoint(destination);

  useEffect(() => {
    let cancelled = false;

    async function mountMap() {
      if (!mapRef.current) return;

      setFailed(false);
      const routeOrigin = campusPoint(origin);
      const routeDestination = campusPoint(destination);

      try {
        const L = await loadLeaflet();

        if (cancelled || !mapRef.current) return;

        leafletMapRef.current?.remove();

        const map = L.map(mapRef.current, {
          attributionControl: true,
          scrollWheelZoom: false,
          zoomControl: true,
        });

        leafletMapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        const originIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 999px;
              background: #f7b134;
              border: 4px solid white;
              box-shadow: 0 2px 10px rgba(0,0,0,.25);
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const destinationIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 999px;
              background: #344cb7;
              border: 4px solid white;
              box-shadow: 0 2px 10px rgba(0,0,0,.25);
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([routeOrigin.lat, routeOrigin.lng], { icon: originIcon })
          .addTo(map)
          .bindPopup(
            `<strong>${escapeHtml(routeOrigin.name)}</strong><br/>${escapeHtml(
              routeOrigin.address,
            )}`,
          );

        L.marker([routeDestination.lat, routeDestination.lng], {
          icon: destinationIcon,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${escapeHtml(
              routeDestination.name,
            )}</strong><br/>${escapeHtml(routeDestination.address)}`,
          );

        const route = L.polyline(
          [
            [routeOrigin.lat, routeOrigin.lng],
            [routeDestination.lat, routeDestination.lng],
          ],
          {
            color: "#344cb7",
            dashArray: "8 8",
            weight: 4,
            opacity: 0.95,
          },
        );

        route.addTo(map);
        map.fitBounds(route.getBounds(), { padding: [40, 40] });
      } catch {
        setFailed(true);
      }
    }

    mountMap();

    return () => {
      cancelled = true;
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [origin, destination]);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originPoint.lat},${originPoint.lng}&destination=${destinationPoint.lat},${destinationPoint.lng}`;

  return (
    <div
      className={`relative min-h-52 overflow-hidden rounded-xl border border-[#dde5f5] bg-[#edf1f5] ${className}`}
    >
      <div
        ref={mapRef}
        className="absolute inset-0 z-0"
        aria-label="BINUS Bandung campus route map"
      />

      <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2">
        <Legend color="bg-warning" label={`${originPoint.shortName} shuttle`} />
        <Legend color="bg-primary" label={destinationPoint.shortName} />
      </div>

      {failed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 p-6 text-center">
          <MapPin className="size-8 text-primary" />
          <p className="mt-3 text-sm font-bold">Map tiles could not load</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check internet access, then reload this page.
          </p>
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/94 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur">
        <span className="flex items-center gap-2 text-foreground">
          {campusName(origin)}
          <ArrowRight className="size-3.5 text-primary" />
          {campusName(destination)}
        </span>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-primary transition hover:bg-secondary/80"
        >
          Open route
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold shadow-sm backdrop-blur">
      <span className={`size-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
