import axios from 'axios';
import qs from 'querystring';
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
    // TODO: Cache token request
    const authToken = await this.getToken();

    // TODO: Replace static id
    const { data } = await axios.get<{ data: AmadeusSeatMapResponse[] }>(
      `${process.env.AMADEUS_BASE_URL}/shopping/seatmaps?flight-orderId=eJzTd9f3DvWNCPAEAAvBAoQ%3D`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return data.data[0];
  }

  private async getToken(): Promise<string> {
    const body = {
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
      grant_type: 'client_credentials',
    };

    const { data } = await axios.post(
      `${process.env.AMADEUS_BASE_URL}/security/oauth2/token`,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = data;

    return access_token;
  }
}

export default new AmadeusAircraftFinder();
