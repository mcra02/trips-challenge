import {
  ApiProperty
} from '@nestjs/swagger';

export class PaginationQueryParamsDTO{

  @ApiProperty({
    description: 'down filter for the trip start',
    type: Number,
    required: false
  })
  start_gte?: number

  @ApiProperty({
    description: 'up filter for the trip start',
    type: Number,
    required: false
  })
  start_lte?: number

  @ApiProperty({
    description: 'down filter for the trip distance',
    type: Number,
    required: false,
    default: 0.5
  })
  distance_gte?: number

  @ApiProperty({
    description: 'Number of trips to retrieve',
    type: Number,
    required: false,
    default: 20
  })
  limit?: number;

  @ApiProperty({
    description: 'Offset of trips to retrieve',
    type: Number,
    required: false,
    default: 0
  })
  offset?: number;
}
