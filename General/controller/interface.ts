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
  bus_id: string|null;
  organisation_id: string|null;
  plateNumber: string|null;
  route: string|null;
  lat: Decimal | null;
  lng: Decimal | null;
  currentAddress: string | null;
  busStop: string | null;
  busStopLat: Decimal | null;
  busStopLng: Decimal | null;
  // type: "user" | "bus" | "organization";
}

export interface RegisterBusReqI {
  password: string;
  driver: string;
  email: string;
  phone: string | null;
  plateNumber: string;
  route: string | null;
  lat: Decimal | null;
  lng: Decimal | null;
  deviceToken: string | null;
  currentAddress: string | null;
  organisation_id: string;
  // type: "user" | "bus" | "organization";
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
  // type: "user" | "bus" | "organization";
}

export interface LoginReqI {
  email: string;
  password: string;
  deviceToken:string;
  // type: "user" | "bus" | "organization";
}

export const UserData={
  email: true,
  name: true,
  phone: true,
  bus_id: true,
  bus: true,
  organisation_id: true,
  organisation: true,
  currentAddress: true,
  updatedAt: true,
  busStop: true,
  busStopLat: true,
  busStopLng: true,
  deviceToken: true,
  gender: true,
  lat: true,
  lng: true,
  image_name: true,
  isOnline: true,
  shareLocation: true,
  token: true,
  Id: true,
  NativeId: true,
  password:true,
};

export const BusData=
{
  email: true,
  driver: true,
  phone: true,
  plateNumber: true,
  route: true,
  organisation_id: true,
  organisation: true,
  currentAddress: true,
  updatedAt: true,
  deviceToken: true,
  isOnline: true,
  lat: true,
  lng: true,
  shareLocation: true,
  user: true,
  Id: true,
  NativeId: true,
  password:true,
}

export const OrganizationData=
{
  email: true,
  name: true,
  address: true,
  city: true,
  state: true,
  updatedAt: true,
  bus: true,
  closeHr: true,
  closeMin: true,
  openHr: true,
  Id: true,
  NativeId: true,
  lat: true,
  lng: true,
  openMin: true,
  user: true,
  password:true,
}