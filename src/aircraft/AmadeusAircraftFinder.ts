import axios from 'axios';
import {
  AircraftRepository,
  Aircraft,
  AircraftSeat,
} from './AircraftRepository';

const AMADEUS_SEATMAP_API_ENDPOINT =
  'https://test.api.amadeus.com/v1/shopping/seatmaps';

interface AmadeusSeatMapResponse {
  decks: Array<{
    seats: Array<{ number: string; coordinates: { x: number; y: number } }>;
  }>;
}

class AmadeusAircraftFinder implements AircraftRepository {
  async find(aircraftCode: string): Promise<Aircraft> {
    const { data } = await axios.get<AmadeusSeatMapResponse>(
      `${AMADEUS_SEATMAP_API_ENDPOINT}?flight-orderId=eJzTd9f3DvWNCPAEAAvBAoQ%3D`
    );

    const seats: AircraftSeat[] = data.decks.reduce((acc, deck) => {
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
}

export default new AmadeusAircraftFinder();
