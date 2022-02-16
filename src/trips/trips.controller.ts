import {
  Body,
  Controller, Delete, Get, Param, Post, Query
} from '@nestjs/common';
import {
  ApiAcceptedResponse, ApiOperation, ApiTags
} from '@nestjs/swagger';
import {
  PaginationQueryParamsDTO
} from '../utils/DTO/pagination.dto';
import {
  CreateTripDTO
} from './DTO/trips.dto';
import {
  ListTrips,
  Trip
} from './models/trips.model';
import {
  TripsService
} from './trips.service';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {

  constructor(
    private readonly _service: TripsService
  ){}

  @Get('')
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: ListTrips
  })
  @ApiOperation({
    summary: 'Get all trips',
    description: 'Get all trips'
  })
  async findAll(
    @Query() params: PaginationQueryParamsDTO
  ): Promise<ListTrips> {
    return await this._service.findAllTrips(params);
  }

  @Post('')
  @ApiAcceptedResponse({
    description: 'The record has successfully create trip.',
    type: Trip
  })
  @ApiOperation({
    summary: 'Create trips',
    description: 'Create trips'
  })
  async create(
    @Body() data: CreateTripDTO
  ): Promise<Trip>{
    return this._service.createTrip(data);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: 'The record has successfully delete trip.',
    type: Trip
  })
  @ApiOperation({
    summary: 'Delete trips',
    description: 'Delete trips'
  })
  async delete(
    @Param('id') id: string
  ): Promise<Trip>{
    return this._service.deleteTrip(id);
  }

}
