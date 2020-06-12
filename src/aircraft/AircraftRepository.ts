export interface Aircraft {
  code: string;
  seats: AircraftSeat[];
}

export interface AircraftSeat {
  number: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface AircraftRepository {
  find(aircraftCode: string): Promise<Aircraft>;
}
