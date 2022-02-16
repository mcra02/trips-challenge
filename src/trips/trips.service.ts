import {
  Injectable
} from '@nestjs/common';
import {
  PaginationQueryParamsDTO
} from 'src/utils/DTO/pagination.dto';
import {
  CreateTripDTO, ReadingDTO
} from './DTO/trips.dto';
import {
  ListTrips,
  Trip
} from './models/trips.model';
import {
  TripsRepository
} from './trips.repository';
import * as NodeGeocoder from 'node-geocoder';
import * as turf from '@turf/turf';

@Injectable()
export class TripsService {
  private geocoder: any

  constructor(
    private readonly _repository: TripsRepository
  ){
    this.geocoder =  NodeGeocoder({
      provider: 'google',

      apiKey: 'AIzaSyA6Ef15S7HFkzJNMZHXa-RCkJ0V1lJ03o0',
      formatter: null
    });
  }

  async createTrip(data:CreateTripDTO): Promise<Trip>{
    const trip: Trip = new Trip();
    const {
      readings
    } = data;
    const {
      mayor, menor, overspeedsCount
    } = this.selectReadings(readings);

    trip.start = {
      ...mayor.location,
      time: mayor.time,
      address: await this.getGeocodingAddress(mayor.location)
      // address: ''
    };
    trip.end = {
      ...menor.location,
      time: menor.time,
      address: await this.getGeocodingAddress(menor.location)
      // address: ''
    };
    trip.distance = this.distance({
      lat1: mayor.location.lat, lon1: mayor.location.lon, lat2: menor.location.lat, lon2: menor.location.lon
    });
    trip.duration = trip.start.time - trip.end.time;
    trip.overspeedsCount = overspeedsCount;
    trip.boundingBox = this.getBoundingBoxPolygon({
      lat1: mayor.location.lat, lon1: mayor.location.lon, lat2: menor.location.lat, lon2: menor.location.lon
    });

    return await this._repository.create(trip);
  }

  async findAllTrips(params: PaginationQueryParamsDTO): Promise<ListTrips>{
    return await this._repository.findAll(params);
  }

  async deleteTrip(id: string): Promise<Trip> {
    return await this._repository.delete(id);
  }

  selectReadings(readings: ReadingDTO[]): any {
    let mayor = null;
    let menor = null;
    let overspeedsCount = 0;
    readings.forEach((r:ReadingDTO) => {
      if (!mayor && !menor){
        mayor = r;
        menor = r;
      }
      else {
        if(r.time > mayor.time){
          mayor = r;
        }
        if(r.time < menor.time){
          menor = r;
        }
      }
      if(r.speed > r.speedLimit)
        overspeedsCount ++;
    });
    return {
      mayor, menor, overspeedsCount
    };
  }

  async getGeocodingAddress(location: any){
    const res = await this.geocoder.reverse({
      ...location
    });
    return res[0].formattedAddress;
  }

  distance({
    lat1, lon1, lat2, lon2
  }): number {

    // const toRad = (Value) =>
    // {
    //   return Value * Math.PI / 180;
    // };

    // const R = 6371; // km
    // const dLat = toRad(lat2-lat1);
    // const dLon = toRad(lon2-lon1);
    // const lati1 = toRad(lat1);
    // const lati2 = toRad(lat2);

    // const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    //     Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lati1) * Math.cos(lati2);
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // const d = R * c;
    // return Number((d * 10).toFixed(1));

    const p1 = turf.point([
      lon1,
      lat1
    ]);
    const p2 = turf.point([
      lon2,
      lat2
    ]);
    const options: any = {
      units: 'kilometers'
    };
    const distance = turf.distance(p1, p2, options);
    return Number((distance * 10).toFixed(1));
  }

  getBoundingBoxPolygon({
    lat1, lon1, lat2, lon2
  }){
    const line = turf.points([
      [
        lon1,
        lat1
      ],
      [
        lon2,
        lat2
      ]
    ]);
    const bbox = turf.bbox(line);
    const bboxPolygon = turf.bboxPolygon(bbox);
    const data = bboxPolygon.geometry.coordinates[0].map(x => ({
      lat: x[1],
      lon: x[0]
    }));
    return data;
  }

}
