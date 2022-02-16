import {
  Injectable
} from '@nestjs/common';
import {
  InjectModel
} from '@nestjs/mongoose';
import {
  Model
} from 'mongoose';
import {
  PaginationQueryParamsDTO
} from 'src/utils/DTO/pagination.dto';
import {
  ListTrips,
  Trip, TripDocument
} from './models/trips.model';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectModel(Trip.name) private readonly model: Model<TripDocument>
  ) {}

  async findAll(params: PaginationQueryParamsDTO): Promise<ListTrips> {
    const filters = {

    };
    if (params.start_gte)
      filters['start.time'] = {
        $gte: params.start_gte
      };
    if (params.start_lte)
      filters['start.time'] = {
        $lte: params.start_lte
      };
    if (params.distance_gte)
      filters['distance'] = {
        $gte: params.distance_gte
      };
    const data:any = await this.model.find(filters).skip(params.offset).limit(params.limit).exec();
    return {
      trips: data.map((x: Trip|any) => x.transform())
      // trips: data
    };
  }

  async create(data: Trip): Promise<Trip> {
    return await new this.model({
      ...data
    }).save();
  }

  async delete(id: string): Promise<Trip> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
