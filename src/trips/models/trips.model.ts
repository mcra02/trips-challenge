import {
  Prop, Schema, SchemaFactory
} from '@nestjs/mongoose';
import {
  ApiProperty
} from '@nestjs/swagger';
import {
  Document
} from 'mongoose';

export type TripDocument = Trip & Document;
export type PointDocument = Point & Document;
export type LocationDocument = Location & Document;

@Schema()
export class Point {
  @ApiProperty()
  @Prop({
    type: Number
  })
  lat: number

  @ApiProperty()
  @Prop({
    type: Number
  })
  lon: number
}

@Schema()
class Location extends Point {
  @ApiProperty()
  @Prop({
    type: Number
  })
  time: number

  @ApiProperty()
  @Prop({
    type: String
  })
  address: string
}

const PointSchema = SchemaFactory.createForClass(Point);
const LocationSchema = SchemaFactory.createForClass(Location);

@Schema()
export class Trip {

  @ApiProperty()
  id: string;

  @ApiProperty({
    type: Location
  })
  @Prop({
    type: LocationSchema
  })
  start: Location;

  @ApiProperty({
    type: Location
  })
  @Prop({
    type: LocationSchema
  })
  end: Location;

  @ApiProperty()
  @Prop({
    type: Number
  })
  distance: number

  @ApiProperty()
  @Prop({
    type: Number
  })
  duration: number

  @ApiProperty()
  @Prop({
    type: Number
  })
  overspeedsCount: number

  @ApiProperty({
    type: [Point]
  })
  @Prop({
    type: [PointSchema]
  })
  boundingBox: Point[]
}

export const TripSchema = SchemaFactory.createForClass(Trip);

TripSchema.method('transform', function() {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.end._id;
  delete obj.start._id;
  obj.boundingBox.map((x: Point|any) => delete x._id);

  return obj;
});

export class ListTrips {
  trips: Trip[]
}
