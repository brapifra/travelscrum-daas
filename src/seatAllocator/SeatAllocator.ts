import { AircraftSeat } from '../aircraft/AircraftRepository';

export interface SeatAllocator {
  allocate(passengers: any[], seats: AircraftSeat[]): Promise<SeatAllocation>;
}

export type SeatAllocation = Array<{
  passengerId: string;
  seatNumber: string;
}>;