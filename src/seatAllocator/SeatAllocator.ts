import { AircraftSeat } from '../aircraft/AircraftRepository';

export interface SeatAllocator {
  allocate(passengers: any[], seats: AircraftSeat[]): Promise<SeatAllocation>;
}

export interface SeatAllocation {
  id: string;
  allocations: Array<{
    passengerId: string;
    groupId: string;
    seatNumber: string;
    riskFactor: number;
  }>;
}
