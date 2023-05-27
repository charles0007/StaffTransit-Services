import { Decimal } from "@prisma/client/runtime";

export interface RegisterUserReqI {
  email: string;
  name: string;
  gender: string | null;
  phone: string | null;
  token: string | null;
  deviceToken: string | null;
  password: string;
  image_name: string | null;
  image_path: string | null;
  bus_id: string;
  organisation_id: string;
  lat: Decimal | null;
  lng: Decimal | null;
  currentAddress: string | null;
  busStop: string | null;
  busStopLat: Decimal | null;
  busStopLng: Decimal | null;
  type: "user" | "bus" | "organization";
}

export interface RegisterBusReqI {
  password: string;
  driver: string | null;
  email: string;
  phone: string | null;
  plate: string | null;
  route: string | null;
  lat: Decimal | null;
  lng: Decimal | null;
  deviceToken: string | null;
  currentAddress: string | null;
  organisation_id: string;
  type: "user" | "bus" | "organization";
}

export interface RegisterOrganisationReqI {
  name: string;
  email: string;
  password: string;
  address: string | null;
  city: string | null;
  state: string | null;
  openHr: string | null;
  openMin: string | null;
  closeHr: string | null;
  closeMin: string | null;
  lat: Decimal | null;
  lng: Decimal | null;
  type: "user" | "bus" | "organization";
}

export interface LoginReqI {
  email: string;
  password: string;
  deviceToken:string;
  type: "user" | "bus" | "organization";
}
