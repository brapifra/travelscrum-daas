import axios from 'axios';
import {
  AircraftRepository,
  Aircraft,
  AircraftSeat,
} from './AircraftRepository';

interface AmadeusSeatMapResponse {
  decks: Array<{
    seats: Array<{ number: string; coordinates: { x: number; y: number } }>;
  }>;
}

class AmadeusAircraftFinder implements AircraftRepository {
  async find(aircraftCode: string): Promise<Aircraft> {
    const aircraftInfo = await this.fetchAircraftInfo();

    const seats: AircraftSeat[] = aircraftInfo.decks.reduce((acc, deck) => {
      const deckSeats: AircraftSeat[] = deck.seats.map((seat) => ({
        number: seat.number,
        coordinates: seat.coordinates,
      }));

      return [...acc, ...deckSeats];
    }, []);

    return {
      code: aircraftCode,
      seats,
    };
  }

  private async fetchAircraftInfo(): Promise<AmadeusSeatMapResponse> {
    const { data } = await axios.get<{ data: AmadeusSeatMapResponse[] }>(
      `${process.env.AMADEUS_SEATMAP_API_ENDPOINT}?flight-orderId=eJzTd9f3DvWNCPAEAAvBAoQ%3D`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AMADEUS_SEATMAP_API_TOKEN}`,
        },
      }
    );

    return data.data[0];
  }
}

export default new AmadeusAircraftFinder();
