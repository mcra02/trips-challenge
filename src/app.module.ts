import {
  Module
} from '@nestjs/common';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  TripsModule
} from './trips/trips.module';
import {
  UtilsModule
} from './utils/utils.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      {
        dbName: process.env.MONGO_INITDB_DATABASE
      }
    ),
    TripsModule,
    UtilsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
