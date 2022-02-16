import {
  Module
} from '@nestjs/common';
import {
  TripsService
} from './trips.service';
import {
  TripsController
} from './trips.controller';
import {
  TripsRepository
} from './trips.repository';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  Trip, TripSchema
} from './models/trips.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trip.name, schema: TripSchema
      }
    ])
  ],
  providers: [
    TripsService,
    TripsRepository
  ],
  controllers: [TripsController]
})
export class TripsModule {}
