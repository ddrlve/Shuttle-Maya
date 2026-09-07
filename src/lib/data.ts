// Dummy/hardcoded data for the Shuttle Maya MVP.
// No backend yet — everything here simulates what an API would return.

export type Campus = {
  code: string;
  name: string;
  shortName: string;
  address: string;
  lat: number;
  lng: number;
};

export const CAMPUSES: Campus[] = [
  {
    code: "paskal",
    name: "BINUS @Bandung - Paskal Campus",
    shortName: "Paskal",
    address:
      "Jl. Pasir Kaliki No.25-27, Paskal Hyper Square, Ciroyom, Andir, Kota Bandung, Jawa Barat 40181",
    lat: -6.914744,
    lng: 107.596315,
  },
  {
    code: "dago",
    name: "BINUS @Bandung - Dago Campus",
    shortName: "Dago",
    address:
      "Jl. Sentra Dago Pakar Raya Komplek Dago Pakar Blok F-2, Mekarsaluyu, Cimenyan, Kabupaten Bandung, Jawa Barat 40191",
    lat: -6.8686,
    lng: 107.63185,
  },
];

export type ScheduleSlot = {
  id: string;
  time: string; // "07:00"
  durationMin: number;
  seatsLeft: number;
  seatsTotal: number;
  busCode: string;
};

export const SCHEDULES: ScheduleSlot[] = [
  { id: "s1", time: "07:00", durationMin: 25, seatsLeft: 6, seatsTotal: 16, busCode: "BBS01" },
  { id: "s2", time: "09:00", durationMin: 25, seatsLeft: 12, seatsTotal: 16, busCode: "BBS02" },
  { id: "s3", time: "11:00", durationMin: 30, seatsLeft: 2, seatsTotal: 16, busCode: "BBS01" },
  { id: "s4", time: "13:00", durationMin: 25, seatsLeft: 9, seatsTotal: 16, busCode: "BBS03" },
  { id: "s5", time: "17:00", durationMin: 30, seatsLeft: 4, seatsTotal: 16, busCode: "BBS02" },
  { id: "s6", time: "19:00", durationMin: 25, seatsLeft: 0, seatsTotal: 16, busCode: "BBS01" },
];

export type SeatStatus = "available" | "booked" | "driver" | "selected";

export type SeatCell = { id: string; status: Exclude<SeatStatus, "selected"> } | null;

// Each row has 4 seat slots with an aisle gap between the 2nd and 3rd.
// `null` renders an empty slot (e.g. next to the driver).
export const SEAT_ROWS: SeatCell[][] = [
  [{ id: "driver", status: "driver" }, null, null, null],
  [
    { id: "1", status: "available" },
    { id: "2", status: "available" },
    { id: "3", status: "booked" },
    { id: "4", status: "booked" },
  ],
  [
    { id: "5", status: "available" },
    { id: "6", status: "available" },
    { id: "7", status: "available" },
    { id: "8", status: "available" },
  ],
  [
    { id: "9", status: "booked" },
    { id: "10", status: "available" },
    { id: "11", status: "available" },
    { id: "12", status: "available" },
  ],
  [
    { id: "13", status: "available" },
    { id: "14", status: "booked" },
    { id: "15", status: "available" },
    { id: "16", status: "available" },
  ],
];

export type TicketStatus = "active" | "completed" | "cancelled";

export type Ticket = {
  id: string;
  origin: string;
  destination: string;
  date: string; // "Sat, 13th May"
  time: string;
  seat: string;
  busCode: string;
  status: TicketStatus;
};

export const STORAGE_KEYS = {
  tickets: "shuttle-maya:tickets",
  communityRequests: "shuttle-maya:community-requests",
} as const;

export const TICKETS: Ticket[] = [
  {
    id: "t1",
    origin: "Dago",
    destination: "Paskal",
    date: "Sat, 13th May",
    time: "07:00",
    seat: "7",
    busCode: "BBS01",
    status: "active",
  },
  {
    id: "t2",
    origin: "Paskal",
    destination: "Dago",
    date: "Fri, 12th May",
    time: "18:00",
    seat: "3",
    busCode: "BBS02",
    status: "completed",
  },
  {
    id: "t3",
    origin: "Dago",
    destination: "Paskal",
    date: "Thu, 11th May",
    time: "09:00",
    seat: "12",
    busCode: "BBS01",
    status: "completed",
  },
  {
    id: "t4",
    origin: "Paskal",
    destination: "Dago",
    date: "Mon, 8th May",
    time: "17:00",
    seat: "5",
    busCode: "BBS03",
    status: "cancelled",
  },
];

export const CURRENT_USER = {
  name: "Dian",
  fullName: "Dian Rakhmawati Lestari",
  role: "Student",
  binusianId: "2602XXXXXX",
  email: "dian.lestari@binus.ac.id",
};

export type CommunityRequest = {
  id: string;
  destination: string;
  passengers: string;
  preferredTime: string;
  reason: string;
  status: "pending" | "approved";
  createdAt: string;
};
