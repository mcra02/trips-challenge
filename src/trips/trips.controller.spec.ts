import {
  getModelToken
} from '@nestjs/mongoose';
import {
  Test, TestingModule
} from '@nestjs/testing';
import {
  mockRepository
} from '../../test/mocks/trip.mock';
import {
  Trip
} from './models/trips.model';
import {
  TripsController
} from './trips.controller';
import {
  TripsRepository
} from './trips.repository';
import {
  TripsService
} from './trips.service';

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        TripsService,
        TripsRepository,
        {
          provide: getModelToken(Trip.name), useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
