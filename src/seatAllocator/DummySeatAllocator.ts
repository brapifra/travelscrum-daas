import { SeatAllocator, SeatAllocation } from './SeatAllocator';
import { AircraftSeat } from '../aircraft/AircraftRepository';

class DummySeatAllocator implements SeatAllocator {
  async allocate(
    passengers: any[],
    seats: AircraftSeat[]
  ): Promise<SeatAllocation> {
    return [];
  }
}

export default new DummySeatAllocator();
