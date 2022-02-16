import {
  ApiProperty
} from '@nestjs/swagger';
import {
  ArrayMinSize, IsArray, IsNumber
} from 'class-validator';
import {
  Point
} from '../models/trips.model';

export class ReadingDTO {

  @ApiProperty()
  @IsNumber()
  time: number

  @ApiProperty()
  @IsNumber()
  speed: number

  @ApiProperty()
  @IsNumber()
  speedLimit: number

  @ApiProperty({
    type: Point
  })
  location: Point

}

export class CreateTripDTO {

  @ApiProperty({
    type: [ReadingDTO]
  })
  @IsArray()
  @ArrayMinSize(5)
  readings: ReadingDTO[]

}
