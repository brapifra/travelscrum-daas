import { v4 as uuid } from 'uuid';
import { SeatAllocator, SeatAllocation, PassengerSeat } from './SeatAllocator';
import { AircraftSeat } from '../aircraft/AircraftRepository';
import { Passenger } from '../lambdas/createSeatAllocation';
import CountrySummary from '../countrySummary/countrySummary';

interface PassengerWithRiskFactor extends Passenger {
  riskFactor: number;
}

class DummySeatAllocator implements SeatAllocator {
  async allocate(
    passengers: Passenger[],
    seats: AircraftSeat[]
  ): Promise<SeatAllocation> {
    const riskFactorOfPassengers = await this.getRiskFactorOfPassengers(
      passengers
    );

    const passengersWithRiskFactor: PassengerWithRiskFactor[] = passengers.map(
      (passenger, index) => ({
        ...passenger,
        riskFactor: riskFactorOfPassengers[index],
      })
    );

    const groupsSortedByRisk = this.getGroupsSortedByRiskFactor(
      passengersWithRiskFactor
    );

    return {
      id: uuid(),
      allocations: this.generateSeatAllocations(groupsSortedByRisk, seats),
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

  private getGroupsSortedByRiskFactor(
    passengersWithRiskFactor: PassengerWithRiskFactor[]
  ): PassengerWithRiskFactor[][] {
    const groups: {
      [groupId: string]: PassengerWithRiskFactor[];
    } = passengersWithRiskFactor.reduce((acc, passenger) => {
      const groupId = passenger.groupId || 'default_group';
      const groupPassengers = acc[groupId] || [];
      return { ...acc, [groupId]: [...groupPassengers, passenger] };
    }, {});

    const groupsSortedByRisk = Object.values(groups).sort(
      (leftGroup, rightGroup) =>
        this.getGroupRiskFactor(leftGroup) - this.getGroupRiskFactor(rightGroup)
    );

    return groupsSortedByRisk;
  }

  private getGroupRiskFactor(group: PassengerWithRiskFactor[]): number {
    return group.reduce((acc, passenger) => acc + passenger.riskFactor, 0);
  }

  private generateSeatAllocations(
    groupsSortedByRisk: PassengerWithRiskFactor[][],
    seats: AircraftSeat[]
  ): PassengerSeat[] {
    const copyOfSeats = [...seats];

    const passengersSeats = groupsSortedByRisk.reduce((acc, group) => {
      const groupAllocation: PassengerSeat[] = group.map((passenger) => {
        const passengerSeat = copyOfSeats.pop();
        return {
          passengerId: passenger.id,
          groupId: passenger.groupId,
          riskFactor: passenger.riskFactor,
          seatNumber: passengerSeat?.number || 'Not available',
        };
      });

      // Ensure one free seat between groups
      copyOfSeats.pop();

      return [...acc, ...groupAllocation];
    }, [] as PassengerSeat[]);

    return passengersSeats;
  }
}

export default new DummySeatAllocator();
