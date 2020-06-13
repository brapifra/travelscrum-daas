import { v4 as uuid } from 'uuid';
import { SeatAllocator, SeatAllocation } from './SeatAllocator';
import { AircraftSeat } from '../aircraft/AircraftRepository';
import { Passenger } from '../lambdas/createSeatAllocation';
import CountrySummary from '../countrySummary/countrySummary';

class DummySeatAllocator implements SeatAllocator {
  async allocate(
    passengers: Passenger[],
    seats: AircraftSeat[]
  ): Promise<SeatAllocation> {
    const riskFactorOfPassengers = await this.getRiskFactorOfPassengers(passengers);

    return {
      id: uuid(),
      allocations: passengers.map((passenger, index) => ({
        passengerId: passenger.id,
        groupId: passenger.groupId,
        seatNumber: this.getPassengerSeatNumber(passenger, seats),
        riskFactor: riskFactorOfPassengers[index],
      })),
    };
  }

  private getRiskFactorOfPassengers(
    passengers: Passenger[]
  ): Promise<number[]> {
    return Promise.all(
      passengers.map(async (passenger) => {
        const { sitata_risk } = await CountrySummary.getCountryCV19Summary(
          passenger.itinerary[0]?.departure || 'ES'
        );

        return sitata_risk;
      })
    );
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
