import { AircraftSeat } from '../aircraft/AircraftRepository';
import { Passenger } from '../lambdas/createSeatAllocation';

export interface SeatAllocator {
  allocate(
    passengers: Passenger[],
    seats: AircraftSeat[]
  ): Promise<SeatAllocation>;
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
