const DATE_LABELS: Record<string, string> = {
  "2026-06-16": "Tue, 16 Jun",
  "2026-06-17": "Wed, 17 Jun",
  "2026-06-18": "Thu, 18 Jun",
};

export function normalizeDateInput(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (value.includes("17 Jun")) return "2026-06-17";
  if (value.includes("18 Jun")) return "2026-06-18";
  return "2026-06-16";
}

export function formatDisplayDate(value: string) {
  const normalized = normalizeDateInput(value);
  if (DATE_LABELS[normalized]) return DATE_LABELS[normalized];

  const date = new Date(`${normalized}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
