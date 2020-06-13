import { v4 as uuid } from 'uuid';
import { SeatAllocator, SeatAllocation } from './SeatAllocator';
import { AircraftSeat } from '../aircraft/AircraftRepository';
import { Passenger } from '../lambdas/createSeatAllocation';

class DummySeatAllocator implements SeatAllocator {
  async allocate(
    passengers: Passenger[],
    seats: AircraftSeat[]
  ): Promise<SeatAllocation> {
    return {
      id: uuid(),
      allocations: passengers.map((passenger) => ({
        passengerId: passenger.id,
        groupId: passenger.groupId,
        seatNumber: this.getPassengerSeatNumber(passenger, seats),
        riskFactor: Math.floor(Math.random() * 100),
      })),
    };
  }

  private getPassengerSeatNumber(
    passenger: Passenger,
    seats: AircraftSeat[]
  ): string {
    const seatIndex = Math.floor(Math.random() * seats.length);
    return seats[seatIndex].number;
  }
}

export default new DummySeatAllocator();
